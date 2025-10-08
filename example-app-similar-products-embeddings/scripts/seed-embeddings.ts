#!/usr/bin/env tsx

/**
 * PARALLEL EMBEDDING SEED SCRIPT
 * 
 * This script processes products in parallel to significantly speed up embedding generation.
 * 
 * Configuration:
 * - EMBEDDING_CONCURRENCY: Number of products to process simultaneously (default: 5)
 * - EMBEDDING_BATCH_SIZE: Number of products to fetch per GraphQL batch (default: 100)
 * 
 * Performance improvements:
 * - Processes multiple products concurrently instead of one-by-one
 * - Configurable concurrency limits to avoid overwhelming APIs
 * - Proper error handling and result aggregation
 * - Small delays between chunks to be respectful to external APIs
 * 
 * Usage:
 *   EMBEDDING_CONCURRENCY=10 EMBEDDING_BATCH_SIZE=200 pnpm seed
 */

// Load environment variables from .env file
import { readFileSync } from 'fs';
import { join } from 'path';

// Simple .env file loader
function loadEnvFile() {
  try {
    const envPath = join(process.cwd(), '.env');
    const envContent = readFileSync(envPath, 'utf8');
    
    envContent.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    });
  } catch (error) {
    console.warn('Could not load .env file:', error instanceof Error ? error.message : String(error));
  }
}

// Load environment variables before importing other modules
loadEnvFile();

import { gql } from 'urql';

import { createClient } from '@/lib/create-graphq-client';
import { EmbeddingService } from '@/lib/embeddings';
import { Database, getDatabase } from '@/lib/file-database';
import { saleorApp } from '@/saleor-app';

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts($first: Int, $after: String) {
    products(first: $first, after: $after) {
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

// Configuration for parallel processing
const CONCURRENCY_LIMIT = parseInt(process.env.EMBEDDING_CONCURRENCY || '5', 10);
const BATCH_SIZE = parseInt(process.env.EMBEDDING_BATCH_SIZE || '100', 10);

/**
 * Process a single product and generate its embedding
 */
async function processProduct(
  product: Product,
  embeddingService: EmbeddingService,
  db: Database
): Promise<{ success: boolean; skipped: boolean; error?: string }> {
  try {
    console.log(`  Processing: ${product.name} (${product.id})`);

    const embedding = await embeddingService.generateEmbedding(product);
    if (!embedding) {
      console.log(`    ⚠️ Skipped: No usable content for embedding`);
      return { success: false, skipped: true };
    }

    await db.upsertProduct({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      thumbUrl: product.thumbnail?.url,
      vector: embedding,
      updatedAt: new Date().toISOString(),
    });

    console.log(`    ✅ Indexed successfully`);
    return { success: true, skipped: false };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`    ❌ Error processing ${product.id}:`, errorMessage);
    return { success: false, skipped: false, error: errorMessage };
  }
}

/**
 * Process products in parallel with concurrency control
 */
async function processProductsInParallel(
  products: Product[],
  embeddingService: EmbeddingService,
  db: Database
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
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}

async function seedEmbeddings() {
  console.log('🌱 Starting embeddings seed process...');
  console.log(`⚙️ Configuration: Concurrency=${CONCURRENCY_LIMIT}, Batch Size=${BATCH_SIZE}`);
  
  try {
    // Get auth data from APL
    const authDataList = await saleorApp.apl.getAll();
    
    if (authDataList.length === 0) {
      console.error('❌ No authentication data found in APL.');
      console.error('');
      console.error('Please install this app in your Saleor Dashboard first:');
      console.error('1. Start the development server: pnpm dev');
      console.error('2. Expose via ngrok: ngrok http 3000');
      console.error('3. Install in Dashboard: https://your-saleor.com/dashboard/apps/install?manifestUrl=https://your-ngrok.ngrok.io/api/manifest');
      console.error('4. Then run this seed script again');
      process.exit(1);
    }

    // Use APL auth data
    const authData = authDataList[0];
    console.log(`📡 Connected to Saleor: ${authData.saleorApiUrl}`);
    
    const client = createClient(
      authData.saleorApiUrl,
      async () => ({ token: authData.token })
    );

    const db = await getDatabase();
    const embeddingService = new EmbeddingService();

    let totalProcessed = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let hasNextPage = true;
    let after: string | null = null;

    console.log('📡 Fetching products from Saleor...');

    while (hasNextPage) {
      const result: any = await client.query(GET_ALL_PRODUCTS, {
        first: BATCH_SIZE,
        after,
      }).toPromise();

      if (result.error) {
        console.error('❌ GraphQL Error:', result.error);
        throw result.error;
      }

      if (!result.data?.products) {
        console.error('❌ No products data in response');
        break;
      }

      const { products } = result.data;
      hasNextPage = products.pageInfo.hasNextPage;
      after = products.pageInfo.endCursor;

      console.log(`📦 Processing batch of ${products.edges.length} products in parallel...`);

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

      console.log(`📊 Batch completed: ${batchResults.processed} processed, ${batchResults.skipped} skipped, ${batchResults.errors} errors`);

      if (hasNextPage) {
        console.log('    Waiting 1s before next batch...');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log('');
    console.log('🎉 Seed process completed!');
    console.log(`   ✅ Successfully processed: ${totalProcessed}`);
    console.log(`   ⚠️ Skipped (no content): ${totalSkipped}`);
    console.log(`   ❌ Errors: ${totalErrors}`);
    console.log(`   📊 Total: ${totalProcessed + totalSkipped + totalErrors}`);

    const stats = await db.getStats();
    console.log('');
    console.log('📈 Final Database Stats:');
    console.log(`   Total indexed: ${stats.total}`);
    console.log(`   Last updated: ${stats.lastUpdate}`);

  } catch (error) {
    console.error('💥 Fatal error during seed process:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
seedEmbeddings()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Unhandled error:', error);
    process.exit(1);
  });