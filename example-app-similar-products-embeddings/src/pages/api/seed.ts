import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/create-graphq-client';
import { getDatabase } from '@/lib/file-database';
import { EmbeddingService } from '@/lib/embeddings';
import { saleorApp } from '@/saleor-app';
import { gql } from 'urql';

// Configuration for parallel processing
const CONCURRENCY_LIMIT = parseInt(process.env.EMBEDDING_CONCURRENCY || '3', 10); // Lower for API to be more conservative
const BATCH_SIZE = parseInt(process.env.EMBEDDING_BATCH_SIZE || '20', 10);

/**
 * Process a single product and generate its embedding
 */
async function processProduct(
  product: Product,
  embeddingService: EmbeddingService,
  db: any
): Promise<{ success: boolean; skipped: boolean; error?: string }> {
  try {
    console.log(`Processing: ${product.name} (${product.id})`);

    const embedding = await embeddingService.generateEmbedding(product);
    if (!embedding) {
      console.log(`Skipped: No usable content for embedding`);
      return { success: false, skipped: true };
    }

    await db.upsertProduct({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      vector: embedding,
      updatedAt: new Date().toISOString(),
    });

    console.log(`Indexed successfully: ${product.name}`);
    return { success: true, skipped: false };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error processing ${product.id}:`, errorMessage);
    return { success: false, skipped: false, error: errorMessage };
  }
}

/**
 * Process products in parallel with concurrency control
 */
async function processProductsInParallel(
  products: Product[],
  embeddingService: EmbeddingService,
  db: any
): Promise<{ processed: number; skipped: number; errors: number }> {
  const results = { processed: 0, skipped: 0, errors: 0 };
  
  // Create chunks of products to process in parallel
  const chunks: Product[][] = [];
  for (let i = 0; i < products.length; i += CONCURRENCY_LIMIT) {
    chunks.push(products.slice(i, i + CONCURRENCY_LIMIT));
  }

  for (const chunk of chunks) {
    // Process chunk in parallel
    const chunkPromises = chunk.map(product => 
      processProduct(product, embeddingService, db)
    );
    
    const chunkResults = await Promise.all(chunkPromises);
    
    // Aggregate results
    chunkResults.forEach(result => {
      if (result.success) {
        results.processed++;
      } else if (result.skipped) {
        results.skipped++;
      } else {
        results.errors++;
      }
    });

    // Small delay between chunks to avoid overwhelming the API
    if (chunks.indexOf(chunk) < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return results;
}

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($first: Int, $after: String, $channel: String) {
    products(first: $first, after: $after, channel: $channel) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          slug
          name
          description
          category {
            name
          }
          attributes {
            attribute {
              name
            }
            values {
              name
            }
          }
          thumbnail(size: 256) {
            url
          }
          channelListings {
            isPublished
            availableForPurchase
            channel {
              slug
            }
          }
          variants {
            quantityAvailable
          }
        }
      }
    }
  }
`;

interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  productType: {
    name: string;
  };
  category?: {
    name: string;
  };
  attributes: Array<{
    attribute: {
      name: string;
    };
    values: Array<{
      name: string;
    }>;
  }>;
  thumbnail?: {
    url: string;
  };
  channelListings: Array<{
    isPublished: boolean;
    availableForPurchase?: string;
    channel: {
      slug: string;
    };
  }>;
  variants: Array<{
    quantityAvailable?: number;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let client;
    
    // Try to get auth data from APL first
    const authDataList = await saleorApp.apl.getAll();
    
    if (authDataList.length > 0) {
      // Use APL auth data (preferred)
      const authData = authDataList[0];
      console.log(`Using APL auth data for: ${authData.saleorApiUrl}`);
      
      client = createClient(
        authData.saleorApiUrl,
        async () => ({ token: authData.token })
      );
    } else if (process.env.SALEOR_API_URL && process.env.SALEOR_TOKEN) {
      // Fallback to manual credentials
      console.log(`Using manual credentials for: ${process.env.SALEOR_API_URL}`);
      
      client = createClient(
        process.env.SALEOR_API_URL,
        async () => ({ token: process.env.SALEOR_TOKEN! })
      );
    } else {
      return res.status(400).json({ 
        error: 'No authentication found. Please install the app in your Saleor Dashboard first, or provide SALEOR_API_URL and SALEOR_TOKEN environment variables.' 
      });
    }

    const db = await getDatabase();
    const embeddingService = new EmbeddingService();

    let totalProcessed = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let hasNextPage = true;
    let after: string | null = null;

    console.log(`Starting embeddings seed process via API... (Concurrency=${CONCURRENCY_LIMIT}, Batch Size=${BATCH_SIZE})`);

    while (hasNextPage) {
      const result: any = await client.query(GET_ALL_PRODUCTS, {
        first: BATCH_SIZE,
        after,
        channel: "default-channel",
      }).toPromise();

      if (result.error) {
        console.error('GraphQL Error:', result.error);
        return res.status(500).json({ error: `GraphQL Error: ${result.error.message}` });
      }

      if (!result.data?.products) {
        console.error('No products data in response');
        break;
      }

      const { products } = result.data;
      hasNextPage = products.pageInfo.hasNextPage;
      after = products.pageInfo.endCursor;

      console.log(`Processing batch of ${products.edges.length} products in parallel...`);

      // Extract products from edges
      const productList = products.edges.map((edge: any) => edge.node as Product);

      // Process products in parallel
      const batchResults = await processProductsInParallel(
        productList,
        embeddingService,
        db
      );

      // Update totals
      totalProcessed += batchResults.processed;
      totalSkipped += batchResults.skipped;
      totalErrors += batchResults.errors;

      console.log(`Batch completed: ${batchResults.processed} processed, ${batchResults.skipped} skipped, ${batchResults.errors} errors`);

      // Add a small delay between batches to avoid overwhelming the API
      if (hasNextPage) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const stats = await db.getStats();
    
    console.log('Seed process completed via API!');
    console.log(`Successfully processed: ${totalProcessed}`);
    console.log(`Skipped (no content): ${totalSkipped}`);
    console.log(`Errors: ${totalErrors}`);

    return res.status(200).json({
      message: `Seeding completed! Processed ${totalProcessed} products, skipped ${totalSkipped}, ${totalErrors} errors.`,
      stats: {
        processed: totalProcessed,
        skipped: totalSkipped,
        errors: totalErrors,
        total: stats.total,
        published: stats.published,
        inStock: stats.inStock
      }
    });

  } catch (error) {
    console.error('Fatal error during seed process:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error during seeding' 
    });
  }
}