import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/create-graphq-client';
import { getDatabase } from '@/lib/file-database';
import { EmbeddingService } from '@/lib/embeddings';
import { saleorApp } from '@/saleor-app';
import { gql } from 'urql';

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

    console.log('Starting embeddings seed process via API...');

    while (hasNextPage) {
      const result: any = await client.query(GET_ALL_PRODUCTS, {
        first: 20,
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

      console.log(`Processing batch of ${products.edges.length} products...`);

      for (const edge of products.edges) {
        const product = edge.node as Product;

        try {
          console.log(`Processing: ${product.name} (${product.id})`);

          const embedding = await embeddingService.generateEmbedding(product);
          if (!embedding) {
            console.log(`Skipped: No usable content for embedding`);
            totalSkipped++;
            continue;
          }

          const { isPublished, inStock, thumbUrl } = embeddingService.extractProductInfo(product);

          await db.upsertProduct({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            thumbUrl,
            isPublished,
            inStock,
            vector: embedding,
            updatedAt: new Date().toISOString(),
          });

          console.log(`Indexed successfully: ${product.name}`);
          totalProcessed++;
        } catch (error) {
          console.error(`Error processing ${product.id}:`, error);
          totalErrors++;
        }
      }

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