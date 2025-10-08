import { NextApiRequest, NextApiResponse } from 'next';

import { getDatabase, SimilarProduct } from '@/lib/file-database';

interface SimilarProductsRequest {
  productId: string;
  maxResults?: number;
}

interface SimilarProductsResponse {
  base: {
    productId: string;
    slug: string;
  } | null;
  similar: SimilarProduct[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimilarProductsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      base: null,
      similar: [],
      error: 'Method not allowed',
    });
  }

  const { productId, maxResults: maxResultsParam } = req.query;

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({
      base: null,
      similar: [],
      error: 'productId parameter is required and must be a string',
    });
  }

  let maxResults = 6;
  if (maxResultsParam) {
    const parsedMaxResults = parseInt(maxResultsParam as string, 10);
    if (isNaN(parsedMaxResults) || parsedMaxResults < 1) {
      return res.status(400).json({
        base: null,
        similar: [],
        error: 'maxResults parameter must be a positive integer',
      });
    }
    maxResults = Math.min(parsedMaxResults, 24);
  }

  try {
    const startTime = Date.now();
    const db = await getDatabase();

    const similar = await db.findSimilarProducts(productId, maxResults);
    
    // Get the base product info for response
    const baseProduct = await db.getProduct(productId);
    
    if (!baseProduct) {
      return res.status(404).json({
        base: null,
        similar: [],
        error: `Product with id ${productId} not found`,
      });
    }

    // Filter results by similarity threshold  
    const similarityThreshold = 0.05; // Only show products with >5% similarity
    const filteredSimilar = similar.filter(product => product.score > similarityThreshold);

    const duration = Date.now() - startTime;
    console.log(`Similarity query for ${productId}: found ${similar.length} similar products, ${filteredSimilar.length} above threshold (${similarityThreshold}), duration: ${duration}ms`);

    return res.status(200).json({
      base: {
        productId: baseProduct.productId,
        slug: baseProduct.slug,
      },
      similar: filteredSimilar,
    });
  } catch (error) {
    console.error(`Error in similarity API for product ${productId}:`, error);
    
    return res.status(500).json({
      base: null,
      similar: [],
      error: 'Internal server error',
    });
  }
}