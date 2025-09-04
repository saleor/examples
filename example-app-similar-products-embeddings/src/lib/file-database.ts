/**
 * EMBEDDINGS DATABASE - Educational Implementation
 * 
 * This file demonstrates how to store and search product embeddings using a simple JSON database.
 * In production, you'd typically use a vector database like Pinecone, Weaviate, or Qdrant.
 * 
 * KEY CONCEPTS DEMONSTRATED:
 * - Vector storage and retrieval
 * - Cosine similarity calculations
 * - K-nearest neighbors search
 * - Database operations for embeddings
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';

/**
 * ProductEmbedding - The core data structure
 * 
 * WHAT IT STORES:
 * - Product metadata (ID, name, thumbnail, etc.)
 * - The actual embedding vector (1536 numbers)
 * - Business info (published status, stock availability)
 * - Timestamp for freshness tracking
 */
export interface ProductEmbedding {
  productId: string;      // Unique Saleor product ID
  slug: string;           // URL-friendly product identifier
  name: string;           // Human-readable product name
  thumbUrl?: string;      // Product image for UI display
  vector: number[];       // The actual embedding (1536 dimensions)
  updatedAt: string;      // ISO timestamp of last update
}

/**
 * SimilarProduct - Similarity search result
 * 
 * WHAT IT CONTAINS:
 * - Basic product info for display
 * - Similarity score (0-1, where 1 = identical)
 */
export interface SimilarProduct {
  productId: string;
  slug: string;
  name: string;
  thumbUrl?: string;
  score: number;         // Cosine similarity score (0-1)
}

/**
 * DatabaseStats - Index health information
 * 
 * WHAT IT TRACKS:
 * - Total products with embeddings
 * - Business metrics (published, in stock)
 * - Freshness indicator (last update time)
 */
export interface DatabaseStats {
  total: number;         // Total products in index
  published: number;     // Products visible to customers
  inStock: number;       // Products available for purchase
  lastUpdate: string | null;  // Most recent embedding update
}

/**
 * Vector Normalization - Critical for Cosine Similarity
 * 
 * WHY NORMALIZE?
 * Cosine similarity measures angle between vectors, not their length.
 * Normalizing makes all vectors the same length (1.0) so we compare direction only.
 * 
 * WHAT IT DOES:
 * Converts [3, 4, 0] to [0.6, 0.8, 0.0] (same direction, unit length)
 * 
 * MATHEMATICAL PROCESS:
 * 1. Calculate magnitude: √(3² + 4² + 0²) = √25 = 5
 * 2. Divide each component: [3/5, 4/5, 0/5] = [0.6, 0.8, 0.0]
 * 3. Result has length 1.0 but same direction
 * 
 * WITHOUT NORMALIZATION:
 * - Longer descriptions would dominate similarity
 * - "Brief product" vs "Very detailed product description..." wouldn't be fair
 */
export function normalizeVector(vector: number[]): number[] {
  // Calculate vector magnitude (length)
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  
  // Handle edge case: zero vectors can't be normalized
  if (magnitude === 0) return vector;
  
  // Scale each component to create unit vector
  return vector.map(val => val / magnitude);
}

/**
 * Database Class - Simple Vector Storage & Search
 * 
 * PURPOSE:
 * This demonstrates vector database concepts using JSON storage.
 * In production, use proper vector databases like:
 * - Pinecone (cloud-based)
 * - Weaviate (open source)
 * - Qdrant (open source)
 * - Chroma (open source)
 * 
 * WHAT THIS CLASS DOES:
 * 1. Store product embeddings persistently
 * 2. Provide CRUD operations
 * 3. Calculate similarity between products
 * 4. Return ranked similar products
 * 5. Track database statistics
 */
export class Database {
  private dbPath: string;
  private data: { [productId: string]: ProductEmbedding } = {};

  constructor() {
    // Store embeddings in project root as JSON file
    this.dbPath = path.resolve('./embeddings.json');
  }

  /**
   * Initialize Database - Load or Create Storage
   * 
   * WHAT IT DOES:
   * - Checks if embeddings.json exists
   * - Loads existing data or creates empty database
   * - Sets up in-memory index for fast access
   */
  async init(): Promise<void> {
    if (existsSync(this.dbPath)) {
      console.log('Loaded existing embeddings database');
      const fileContent = readFileSync(this.dbPath, 'utf8');
      this.data = JSON.parse(fileContent);
    } else {
      console.log('Created new embeddings database');
      this.data = {};
      this.save();
    }
  }

  /**
   * Persist Data to Disk
   * 
   * PRODUCTION NOTE:
   * Writing to disk on every change is inefficient.
   * Real vector databases batch writes and use WAL (Write-Ahead Logs).
   */
  private save(): void {
    writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
  }

  /**
   * Insert or Update Product Embedding
   * 
   * UPSERT PATTERN:
   * - If product exists, overwrite with new embedding
   * - If product doesn't exist, create new entry
   * - Always persist changes immediately
   */
  async upsertProduct(product: ProductEmbedding): Promise<void> {
    this.data[product.productId] = product;
    this.save(); // Persist immediately (inefficient but simple)
  }

  /**
   * Remove Product from Index
   * 
   * WHEN TO USE:
   * - Product is deleted from Saleor
   * - Product becomes unpublished permanently
   * - Cleanup of stale embeddings
   */
  async deleteProduct(productId: string): Promise<void> {
    delete this.data[productId];
    this.save();
  }

  /**
   * Retrieve Single Product Embedding
   * 
   * USED FOR:
   * - Getting base product for similarity search
   * - Checking if product already has embedding
   * - Retrieving product metadata
   */
  async getProduct(productId: string): Promise<ProductEmbedding | null> {
    return this.data[productId] || null;
  }

  /**
   * Dot Product - Core Vector Math Operation
   * 
   * WHAT IT DOES:
   * Multiplies corresponding elements and sums them up.
   * This measures how much two vectors "agree" in direction.
   * 
   * EXAMPLE:
   * dotProduct([2, 3, 1], [4, 1, 2]) = (2×4) + (3×1) + (1×2) = 8 + 3 + 2 = 13
   * 
   * INTUITION:
   * - High dot product = vectors point in similar directions
   * - Low dot product = vectors point in different directions
   * - Negative dot product = vectors point in opposite directions
   */
  private dotProduct(a: number[], b: number[]): number {
    return a.reduce((sum, val, i) => sum + val * b[i], 0);
  }

  /**
   * Vector Magnitude - Calculate Vector Length
   * 
   * WHAT IT DOES:
   * Calculates the "length" of a vector in n-dimensional space.
   * Uses Euclidean distance formula: √(x₁² + x₂² + ... + xₙ²)
   * 
   * EXAMPLE:
   * magnitude([3, 4, 0]) = √(3² + 4² + 0²) = √(9 + 16 + 0) = √25 = 5
   * 
   * WHY WE NEED IT:
   * Cosine similarity needs to normalize by vector lengths to measure angle only.
   */
  private magnitude(vector: number[]): number {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
  }

  /**
   * Cosine Similarity - The Heart of Vector Search
   * 
   * WHAT IT MEASURES:
   * The cosine of the angle between two vectors.
   * Ranges from -1 (opposite) to 1 (identical), 0 = perpendicular.
   * 
   * WHY USE COSINE SIMILARITY?
   * - Ignores magnitude (document length doesn't matter)
   * - Focuses on direction (semantic orientation)
   * - Works well for high-dimensional sparse data
   * - Standard for text embeddings
   * 
   * FORMULA: cos(θ) = (A · B) / (|A| × |B|)
   * 
   * PRACTICAL INTERPRETATION:
   * - 0.9-1.0: Nearly identical products (same model, different colors)
   * - 0.7-0.9: Very similar products (same category, similar features)
   * - 0.5-0.7: Somewhat similar (related categories)
   * - 0.3-0.5: Loosely related (same broad type)
   * - 0.0-0.3: Different products
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    const dot = this.dotProduct(a, b);      // How much vectors "agree"
    const magA = this.magnitude(a);         // Length of vector A
    const magB = this.magnitude(b);         // Length of vector B
    
    // Handle edge case: zero vectors have undefined similarity
    if (magA === 0 || magB === 0) {
      return 0;
    }
    
    // Normalize by magnitudes to get angle measurement
    return dot / (magA * magB);
  }

  /**
   * Find Similar Products - K-Nearest Neighbors Search
   * 
   * THE MAIN EVENT:
   * This is where the magic happens! We find products most similar to a given product.
   * 
   * ALGORITHM:
   * 1. Get the target product's embedding vector
   * 2. Compare it to every other product using cosine similarity
   * 3. Sort results by similarity score (highest first)
   * 4. Return top K most similar products
   * 
   * PERFORMANCE NOTE:
   * This is O(n) - we compare against every product.
   * Production vector databases use specialized indexes (LSH, HNSW) for O(log n) search.
   * 
   * PARAMETERS:
   * - productId: The product to find similar items for
   * - k: How many similar products to return (default: 6)
   * 
   * RETURNS:
   * Array of similar products with similarity scores, sorted by relevance.
   */
  async findSimilarProducts(productId: string, k: number = 6): Promise<SimilarProduct[]> {
    // Step 1: Get the base product we're comparing against
    const baseProduct = this.data[productId];
    if (!baseProduct) {
      return []; // Product not found in our index
    }

    const similarities: SimilarProduct[] = [];

    // Step 2: Compare base product to all other products
    for (const [id, product] of Object.entries(this.data)) {
      if (id !== productId) { // Don't compare product to itself
        // Calculate how similar this product is to our base product
        const similarity = this.cosineSimilarity(baseProduct.vector, product.vector);
        
        similarities.push({
          productId: product.productId,
          slug: product.slug,
          name: product.name,
          thumbUrl: product.thumbUrl,
          score: similarity, // Higher score = more similar
        });
      }
    }

    // Step 3: Sort by similarity (highest first) and return top K
    return similarities
      .sort((a, b) => b.score - a.score) // Descending order
      .slice(0, k); // Take only top K results
  }

  /**
   * Get Database Statistics
   * 
   * PURPOSE:
   * Provides health metrics for the embeddings index.
   * Useful for monitoring and debugging.
   * 
   * METRICS:
   * - total: How many products have embeddings
   * - published: How many are visible to customers
   * - inStock: How many are available for purchase
   * - lastUpdate: When we last updated any embedding
   */
  async getStats(): Promise<DatabaseStats> {
    const products = Object.values(this.data);
    
    // Count products by business status
    const published = products.filter(p => p.isPublished).length;
    const inStock = products.filter(p => p.inStock).length;
    
    // Find most recent update timestamp
    let lastUpdate: string | null = null;
    if (products.length > 0) {
      lastUpdate = products.reduce((latest, product) => 
        !latest || product.updatedAt > latest ? product.updatedAt : latest
      , '');
    }

    return {
      total: products.length,
      published,
      inStock,
      lastUpdate,
    };
  }

  /**
   * Close Database Connection
   * 
   * PURPOSE:
   * Ensures all changes are saved before shutting down.
   * In our simple implementation, this just saves to disk.
   * 
   * PRODUCTION NOTE:
   * Real databases would flush buffers, close connections, etc.
   */
  async close(): Promise<void> {
    this.save(); // Final save before closing
  }
}

// Global database instance for singleton pattern
let dbInstance: Database | null = null;

/**
 * Get Database Instance - Singleton Pattern
 * 
 * WHY SINGLETON?
 * We want only one database connection/instance throughout the app.
 * This prevents multiple JSON file reads/writes and keeps data consistent.
 * 
 * WHAT IT DOES:
 * - First call: Creates new Database() and initializes it
 * - Subsequent calls: Returns the same instance
 * - Ensures proper initialization before first use
 * 
 * PRODUCTION NOTE:
 * Real apps might use dependency injection or proper connection pooling.
 */
export async function getDatabase(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = new Database();
    await dbInstance.init(); // Load data from disk
  }
  return dbInstance;
}