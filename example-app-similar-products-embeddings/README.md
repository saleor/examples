# Saleor Similar Products App

A Saleor app that finds similar products using OpenAI embeddings and semantic similarity search. The codebase includes detailed documentation to help you understand how embeddings work and how to implement product recommendations.

See [EMBEDDINGS-README.md](./EMBEDDINGS-README.md) for a complete guide to understanding embeddings, or dive into the heavily commented source code in `src/lib/embeddings.ts` and `src/lib/file-database.ts`.

## Quick Start

**Prerequisites:** Node.js 18+, pnpm, and a Saleor instance.

```bash
# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env.local
# Add your OPENAI_API_KEY to .env.local

# Generate GraphQL types
pnpm generate

# Start development server
pnpm dev
```

Install the app in Saleor Dashboard using a tunnel service like ngrok:

```bash
ngrok http 3000
```

Then navigate to:

```
https://your-saleor-instance.com/dashboard/apps/install?manifestUrl=https://your-ngrok-url.ngrok.io/api/manifest
```

Finally, populate the embeddings index:

```bash
pnpm seed
```

Visit `http://localhost:3000` to test the similarity search.

## Database Schema

Products are stored in `embeddings.json` with this structure:

```typescript
interface ProductEmbedding {
  productId: string;
  slug: string;
  name: string;
  thumbUrl?: string;
  vector: number[]; // 1536-dimensional embedding from OpenAI
  updatedAt: string;
}
```

## API Reference

### GET `/api/similar`

Find products similar to a given product.

**Parameters:**

- `productId` (required): Saleor product ID
- `maxResults` (optional): Number of results (default: 6, max: 24)

**Example:**

```bash
curl "http://localhost:3000/api/similar?productId=UHJvZHVjdDo3Mg==&maxResults=6"
```

**Response:**

```json
{
  "base": {
    "productId": "UHJvZHVjdDo3Mg==",
    "slug": "example-product"
  },
  "similar": [
    {
      "productId": "UHJvZHVjdDo3Mw==",
      "slug": "similar-product",
      "name": "Similar Product",
      "thumbUrl": "https://example.com/image.jpg",
      "score": 0.842
    }
  ]
}
```

### GET `/api/stats`

Get database statistics.

**Response:**

```json
{
  "total": 150,
  "lastUpdate": "2024-01-15T10:30:00.000Z"
}
```

## Development

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm generate     # Generate GraphQL types
pnpm seed         # Populate embeddings from Saleor
```

## Limitations

This is an educational implementation with some simplifications:

- JSON file storage (doesn't scale beyond ~1000 products)
- Linear search through all products (O(n) complexity)
- Manual re-indexing when products change (no real-time webhooks)

For production use, consider PostgreSQL with pgvector or a dedicated vector database like Pinecone, Weaviate, or Qdrant. Use approximate nearest neighbor (ANN) algorithms like HNSW or IVF for faster similarity search at scale.

## Extending This App

**Real-time updates:** Add Saleor webhooks for `PRODUCT_CREATED`, `PRODUCT_UPDATED`, and `PRODUCT_DELETED` to automatically re-index products when they change. Only re-embed when content changes (name, description, attributes), not when price or stock levels update.

**Better recommendations:** Combine embedding similarity with purchase history ("customers who bought X also bought Y"), user behavior tracking, or multi-modal embeddings that use both text and images.

**Performance improvements:** Add caching for popular similarity queries, pre-filter by category or attributes before running similarity search, or batch similar queries together.
