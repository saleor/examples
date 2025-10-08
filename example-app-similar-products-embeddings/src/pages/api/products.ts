import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/create-graphq-client';
import { saleorApp } from '@/saleor-app';
import { gql } from 'urql';

const GET_PRODUCTS_FOR_SELECT = gql`
  query GetProductsForSelect($first: Int, $search: String, $channel: String) {
    products(first: $first, filter: { search: $search }, channel: $channel) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;

interface ProductOption {
  id: string;
  name: string;
  slug: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let client;
    
    // Try to get auth data from APL first
    const authDataList = await saleorApp.apl.getAll();
    
    if (authDataList.length > 0) {
      // Use APL auth data (preferred)
      const authData = authDataList[0];
      
      client = createClient(
        authData.saleorApiUrl,
        async () => ({ token: authData.token })
      );
    } else if (process.env.SALEOR_API_URL && process.env.SALEOR_TOKEN) {
      // Fallback to manual credentials
      client = createClient(
        process.env.SALEOR_API_URL,
        async () => ({ token: process.env.SALEOR_TOKEN! })
      );
    } else {
      return res.status(400).json({ 
        error: 'No authentication found. Please install the app in your Saleor Dashboard first.' 
      });
    }

    const search = req.query.search as string;
    const result: any = await client.query(GET_PRODUCTS_FOR_SELECT, {
      first: 50, // Limit to 50 products for performance
      search: search || undefined,
      channel: "default-channel",
    }).toPromise();

    if (result.error) {
      console.error('GraphQL Error:', result.error);
      return res.status(500).json({ error: `GraphQL Error: ${result.error.message}` });
    }

    if (!result.data?.products) {
      return res.status(500).json({ error: 'No products data in response' });
    }

    const products: ProductOption[] = result.data.products.edges.map((edge: any) => ({
      id: edge.node.id,
      name: edge.node.name,
      slug: edge.node.slug,
    }));

    return res.status(200).json({ products });

  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error fetching products' 
    });
  }
}