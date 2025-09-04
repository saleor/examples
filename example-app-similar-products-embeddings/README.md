# Saleor Similar Products App

A Saleor app that provides intelligent product recommendations using OpenAI embeddings and semantic similarity search. This app demonstrates how to build embeddings-based product recommendations with comprehensive documentation and working code examples.

📖 **Documentation Focus**: Every component includes detailed explanations of how and why it works, making it easy to understand and extend.

## 🎯 Learning Objectives

By exploring this app, you'll understand:

- **What embeddings are** and why they're useful for product recommendations
- **How vector similarity works** using cosine similarity mathematics
- **OpenAI embeddings integration** for production-ready semantic understanding
- **Vector storage and search** concepts with a simple JSON database
- **Product text extraction** strategies for better similarity matching

## ✨ Features

🔍 **Semantic Product Search**: Find similar products using OpenAI's text-embedding-3-small model  
📚 **Comprehensive Documentation**: Every function explained with comments, examples, and context  
🗄️ **Simple JSON Storage**: File-based database for vector concepts  
📊 **Interactive Dashboard**: Test similarity searches and explore how embeddings work  
🚀 **REST API**: Clean API for fetching similar products with similarity scores  
⚡ **OpenAI Integration**: Uses production-ready embeddings for semantic understanding

## 📖 Resources

- **[EMBEDDINGS-README.md](./EMBEDDINGS-README.md)** - Complete guide to understanding embeddings
- **[src/lib/embeddings.ts](./src/lib/embeddings.ts)** - Heavily commented embedding generation code
- **[src/lib/file-database.ts](./src/lib/file-database.ts)** - Documented vector storage and similarity calculations

## 🚀 Quick Start

### Prerequisites

- [Node.js 18+](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)
- Saleor instance (for product data)

### Installation

1. **Clone and install dependencies:**

```bash
git clone <this-repo>
cd saleor-app-embeddings
pnpm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env.local
```

Add your configuration:

```env
# Required: OpenAI API key for embeddings
OPENAI_API_KEY=sk-your-openai-api-key
```

3. **Generate GraphQL types:**

```bash
pnpm generate
```

4. **Start the development server:**

```bash
pnpm dev
```

5. **Install the app in Saleor Dashboard:**

Use a tunnel service like [ngrok](https://ngrok.com/) to expose your local app:

```bash
ngrok http 3000
```

Then install via Dashboard:

```
https://your-saleor-instance.com/dashboard/apps/install?manifestUrl=https://your-ngrok-url.ngrok.io/api/manifest
```

6. **Populate your embeddings index:**

```bash
pnpm seed
```

_The seed script automatically uses APL authentication from your installed app._

Visit `http://localhost:3000` to explore the dashboard!

## 🔍 How It Works

### 1. Product Text Extraction

The app extracts and prioritizes product information for embeddings:

```
Priority 1: Product Type (e.g., "T-Shirt" vs "Juice")
Priority 2: Attributes (Color, Size, Material)
Priority 3: Category (Clothing, Beverages)
Priority 4: Description (Marketing text)
Priority 5: Name (Often marketing-focused)
```

**Example structured text:**

```
Type: T-Shirt
Attributes: Color: Red; Size: Large; Material: Cotton
Category: Clothing
Description: Comfortable cotton t-shirt perfect for casual wear
Name: Summer Comfort Tee
```

### 2. Embedding Generation

**OpenAI Integration:**

- Uses `text-embedding-3-small` model for high-quality semantic embeddings
- Understands synonyms and semantic relationships (e.g., "red" ≈ "crimson")
- Production-ready with excellent similarity matching
- Costs ~$0.02 per 1000 products (very affordable)

### 3. Vector Storage

Products are stored in `embeddings.json`:

```json
{
  "productId123": {
    "productId": "productId123",
    "name": "Red Cotton T-Shirt",
    "slug": "red-cotton-tshirt",
    "vector": [0.1, 0.8, 0.3, ...], // 1536 numbers
    "isPublished": true,
    "inStock": true,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### 4. Similarity Search

The `/api/similar` endpoint:

1. **Retrieves** the base product's embedding vector
2. **Compares** against all other products using cosine similarity
3. **Filters** results by similarity threshold (currently 0.05 for demo)
4. **Returns** top-k most similar products with scores

**Cosine Similarity Explained:**

- Measures angle between vectors (not length)
- Range: -1 (opposite) to 1 (identical)
- ~0.9: Nearly identical products
- ~0.7: Very similar products
- ~0.5: Somewhat related products
- ~0.3: Loosely related products

## 📊 Database Schema

Simple JSON structure for educational purposes:

```typescript
interface ProductEmbedding {
  productId: string; // Saleor product ID
  slug: string; // URL-friendly identifier
  name: string; // Display name
  thumbUrl?: string; // Product image
  isPublished: boolean; // Visible in store
  inStock: boolean; // Available for purchase
  vector: number[]; // 1536-dimensional embedding
  updatedAt: string; // Last update timestamp
}
```

## 🛠 API Reference

### GET `/api/similar`

Find products similar to a given product.

**Parameters:**

- `productId` (required): Saleor product ID
- `k` (optional): Number of results (default: 6, max: 24)

**Example:**

```bash
curl "http://localhost:3000/api/similar?productId=UHJvZHVjdDo3Mg==&k=6"
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
  "published": 120,
  "inStock": 80,
  "lastUpdate": "2024-01-15T10:30:00.000Z"
}
```

## 🎓 Dashboard

Visit `/` to access the interface:

- **📈 Index Status**: View embedding database statistics
- **🔍 Test Similarity**: Try similarity searches with real products
- **📚 API Documentation**: Interactive API reference
- **💡 Hints**: Understand what similarity scores mean

## 🔧 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm generate     # Generate GraphQL types
pnpm seed         # Populate embeddings from Saleor
pnpm lint         # Check code style
```

### Project Structure

```
src/
├── lib/
│   ├── embeddings.ts        # Embedding service
│   ├── file-database.ts     # JSON storage with vector operations
│   └── create-graphql-client.ts
├── pages/
│   ├── api/
│   │   ├── similar.ts       # Similarity search endpoint
│   │   ├── stats.ts         # Database statistics
│   │   ├── seed.ts          # Populate embeddings
│   │   └── manifest.ts      # Saleor app manifest
│   └── index.tsx            # Educational dashboard
└── scripts/
    └── seed-embeddings.ts   # Bulk embedding generation
```

## 🚨 Current Limitations

This app has some current limitations:

- **JSON Storage**: Simple but doesn't scale beyond ~1000 products
- **Linear Search**: O(n) similarity calculation for all products
- **No Real-time Updates**: Manual re-indexing required for product changes
- **No Authentication**: Simplified for development purposes

These limitations can be addressed as the system scales.

## 🔄 Next Steps

Ready to build a production system? Here are logical next steps:

### 🔗 **Add Real-time Updates**

- Implement Saleor webhooks for `PRODUCT_CREATED`, `PRODUCT_UPDATED`, `PRODUCT_DELETED`
- Automatically re-index when products change
- Smart re-embedding logic (only when content changes, not price/stock)

### 🗄️ **Upgrade Storage**

- **Small to Medium Scale**: PostgreSQL with pgvector extension
- **Large Scale**: Vector databases like Pinecone, Weaviate, or Qdrant
- **Hybrid**: Keep metadata in PostgreSQL, vectors in specialized DB

### ⚡ **Improve Performance**

- **Approximate Nearest Neighbors (ANN)**: HNSW, LSH, or IVF indexes
- **Filtering**: Pre-filter by category, price range, or attributes
- **Caching**: Cache popular similarity results

### 🛒 **Advanced Features**

- **Purchase History Recommendations**: "Customers who bought X also bought Y"
- **User Behavior Embeddings**: Track user preferences over time
- **Multi-modal Embeddings**: Combine text + image embeddings
- **A/B Testing**: Compare recommendation algorithms

### 📊 **Business Intelligence**

- **Recommendation Analytics**: Track click-through rates and conversions
- **Product Clustering**: Discover natural product groupings
- **Trend Analysis**: Monitor which products are becoming more similar over time

### 🔒 **Production Readiness**

- **Authentication & Authorization**: Proper app permissions
- **Rate Limiting**: Prevent API abuse
- **Error Handling**: Graceful degradation when embeddings fail
- **Monitoring**: Observability for similarity query performance

## 🤝 Contributing

Contributions are welcome:

1. **Enhanced Documentation**: Better explanations or examples
2. **New Features**: Interactive visualizations, concept explanations
3. **Code Clarity**: More readable implementations
4. **Bug Fixes**: Issues that impede functionality

## 📜 License

MIT License - Use this code to learn and build your own recommendation systems!

---

**💡 Remember**: This app demonstrates embeddings concepts through working code. For production use, consider the "Next Steps" section above to build a scalable, robust system.
