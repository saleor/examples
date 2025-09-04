#!/usr/bin/env tsx

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
    console.warn('Could not load .env file:', error.message);
  }
}

// Load environment variables before importing other modules
loadEnvFile();

// Polyfill fetch for Node.js 16 compatibility
if (!globalThis.fetch) {
  try {
    // Try to use undici fetch which is available in newer Node.js versions
    const { fetch } = await import('undici');
    globalThis.fetch = fetch;
  } catch {
    try {
      // Fallback to node-fetch
      const { default: fetch } = await import('node-fetch');
      globalThis.fetch = fetch;
    } catch {
      console.warn('Could not load fetch polyfill - OpenAI client may not work');
    }
  }
}

import { gql } from 'urql';

import { createClient } from '@/lib/create-graphq-client';
import { EmbeddingService } from '@/lib/embeddings';
import { getDatabase } from '@/lib/file-database';
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

async function seedEmbeddings() {
  console.log('🌱 Starting embeddings seed process...');
  
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
        first: 100,
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

      console.log(`📦 Processing batch of ${products.edges.length} products...`);

      for (const edge of products.edges) {
        const product = edge.node as Product;

        try {
          console.log(`  Processing: ${product.name} (${product.id})`);

          const embedding = await embeddingService.generateEmbedding(product);
          if (!embedding) {
            console.log(`    ⚠️ Skipped: No usable content for embedding`);
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

          console.log(`    ✅ Indexed successfully`);
          totalProcessed++;
        } catch (error) {
          console.error(`    ❌ Error processing ${product.id}:`, error);
          totalErrors++;
        }
      }

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
    console.log(`   Published: ${stats.published}`);
    console.log(`   In stock: ${stats.inStock}`);
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