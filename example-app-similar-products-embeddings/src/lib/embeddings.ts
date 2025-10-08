import OpenAI from 'openai';

import { ProductForEmbeddingQuery } from '@/../generated/graphql';

import { normalizeVector } from './file-database';

// Use GraphQL-generated types for type safety
export type ProductData = NonNullable<ProductForEmbeddingQuery['product']>;

/**
 * EmbeddingService - Product Similarity using OpenAI Embeddings
 * 
 * WHAT ARE EMBEDDINGS?
 * Embeddings are numerical vectors that represent text/data in a high-dimensional space.
 * Similar items have vectors that are close to each other (high cosine similarity).
 * 
 * EXAMPLE:
 * - "Red T-Shirt" might become [0.1, 0.8, 0.3, ...]
 * - "Blue T-Shirt" might become [0.2, 0.7, 0.4, ...] (similar values)
 * - "Coffee Mug" might become [0.9, 0.1, 0.8, ...] (very different values)
 * 
 * This service uses OpenAI's text-embedding-3-small model to generate high-quality
 * semantic embeddings from structured product data.
 */
export class EmbeddingService {
  private openai: OpenAI;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'OPENAI_API_KEY environment variable is required. ' +
        'Get your API key from https://platform.openai.com/api-keys'
      );
    }

    this.openai = new OpenAI({
      apiKey,
    });
  }

  /**
   * Extract and structure product content for embedding generation
   * 
   * WHY THE ORDER MATTERS:
   * We put the most important fields first because they influence similarity more.
   * - Product Type: "Juice" vs "T-Shirt" - fundamental difference
   * - Attributes: Size, Color, Material - key product characteristics  
   * - Category: Broader grouping like "Beverages" or "Clothing"
   * - Description: Detailed text content
   * - Name: Often marketing-focused, less reliable for similarity
   * 
   * EXAMPLE OUTPUT:
   * "Type: Juice
   *  Attributes: Color: Orange; Size: 500ml
   *  Category: Beverages  
   *  Description: Fresh orange juice made from organic oranges
   *  Name: Sunny Orange Delight"
   */
  private extractTextContent(product: ProductData): string {
    const parts: string[] = [];

    // 1. PRODUCT TYPE (highest priority)
    // This is the most important field for grouping similar products
    if (product.productType?.name) {
      parts.push(`Type: ${product.productType.name}`);
    }

    // 2. ATTRIBUTES (second priority) 
    // Color, size, material, etc. - key characteristics that define similarity
    if (product.attributes && product.attributes.length > 0) {
      const attributeTexts = product.attributes
        .filter(attr => attr.attribute.name && attr.values.length > 0)
        .map(attr => {
          const values = attr.values.map(v => v.name).filter(name => name).join(', ');
          return `${attr.attribute.name}: ${values}`;
        })
        .filter(text => text.includes(': '));
      
      if (attributeTexts.length > 0) {
        parts.push(`Attributes: ${attributeTexts.join('; ')}`);
      }
    }

    // 3. CATEGORY (third priority)
    // Broader grouping, useful but less specific than attributes
    if (product.category?.name) {
      parts.push(`Category: ${product.category.name}`);
    }

    // 4. DESCRIPTION (fourth priority)
    // Detailed content, but can be marketing-heavy
    if (product.description) {
      const cleanDescription = product.description
        .replace(/<[^>]*>/g, ' ')    // Remove HTML tags
        .replace(/\s+/g, ' ')        // Normalize whitespace
        .trim();
      if (cleanDescription) {
        parts.push(`Description: ${cleanDescription}`);
      }
    }

    // 5. PRODUCT NAME (lowest priority)
    // Often marketing-focused ("Summer Special"), less reliable for similarity
    if (product.name) {
      parts.push(`Name: ${product.name}`);
    }

    return parts.join('\n');
  }


  /**
   * Generate Embedding Vector for a Product
   * 
   * THE BIG PICTURE:
   * This function converts a Saleor product into a high-dimensional vector using OpenAI's
   * text-embedding-3-small model. The resulting vector can be compared with others using
   * cosine similarity to find similar products.
   * 
   * PROCESS:
   * 1. Extract structured text from product (name, description, attributes, etc.)
   * 2. Send text to OpenAI's embedding API
   * 3. Return normalized vector ready for similarity calculations
   * 
   * WHY NORMALIZE?
   * Normalizing makes all vectors the same "length" so cosine similarity works correctly.
   * Without normalization, longer descriptions would dominate similarity scores.
   */
  async generateEmbedding(product: ProductData): Promise<number[] | null> {
    // STEP 1: Convert product data into structured text for embedding
    const textContent = this.extractTextContent(product);
    
    // Skip products with no meaningful content
    if (!textContent.trim()) {
      console.warn(`Product ${product.id} has no usable text content for embedding`);
      return null;
    }

    // STEP 2: Use OpenAI's embedding model to convert text to vector
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small', // Fast, cost-effective OpenAI model
        input: textContent,
        encoding_format: 'float', // Standard floating-point numbers
      });

      if (!response.data || response.data.length === 0) {
        console.error(`No embedding returned for product ${product.id}`);
        return null;
      }

      const vector = response.data[0].embedding;
      
      // STEP 3: Normalize vector for consistent similarity calculations
      return normalizeVector(vector);
    } catch (error) {
      console.error(`Error generating embedding for product ${product.id}:`, error);
      return null;
    }
  }


  /**
   * Check if Product Needs Re-embedding
   * 
   * WHY RE-EMBED?
   * When products change, their embeddings might become outdated.
   * We only re-embed when content that affects similarity changes.
   * 
   * WHAT TRIGGERS RE-EMBEDDING:
   * - Name changes (affects text content)
   * - Description changes (affects text content)
   * - Category changes (affects similarity grouping)
   * - Attributes change (color, size, material changes)
   * 
   * WHAT DOESN'T TRIGGER RE-EMBEDDING:
   * - Price changes (doesn't affect product similarity)
   * - Stock changes (doesn't affect what the product is)
   * - Image changes (we don't use images for embeddings in this demo)
   */
  shouldReEmbed(oldProduct: ProductData, newProduct: ProductData): boolean {
    if (oldProduct.name !== newProduct.name) return true;
    if (oldProduct.description !== newProduct.description) return true;
    if (oldProduct.category?.name !== newProduct.category?.name) return true;

    // Compare normalized attributes to detect changes
    const oldAttrs = this.normalizeAttributes(oldProduct.attributes || []);
    const newAttrs = this.normalizeAttributes(newProduct.attributes || []);
    
    if (oldAttrs !== newAttrs) return true;

    return false;
  }

  /**
   * Normalize Attributes for Comparison
   * 
   * WHY NORMALIZE?
   * Attributes can be in different orders, but still be the same.
   * We need consistent string representation for accurate comparison.
   * 
   * EXAMPLE:
   * Input: [Color: Red, Blue], [Size: Large, Medium]
   * Output: "Color:Blue,Red|Size:Large,Medium"
   * 
   * Same attributes in different order will produce the same string.
   */
  private normalizeAttributes(attributes: ProductData['attributes']): string {
    if (!attributes || attributes.length === 0) return '';
    
    const normalized = attributes
      .filter(attr => attr.attribute.name)
      .map(attr => ({
        name: attr.attribute.name!,
        values: attr.values.map(v => v.name).filter((name): name is string => !!name).sort(),
      }))
      .sort((a, b) => a.name.localeCompare(b.name)) // Sort attributes alphabetically
      .map(attr => `${attr.name}:${attr.values.join(',')}`)
      .join('|'); // Separate attributes with |
    
    return normalized;
  }
}