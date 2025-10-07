import { NextApiRequest, NextApiResponse } from 'next';

import { getDatabase, DatabaseStats } from '@/lib/file-database';

interface StatsResponse extends DatabaseStats {
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      total: 0,
      lastUpdate: null,
      error: 'Method not allowed',
    });
  }

  try {
    const db = await getDatabase();
    const stats = await db.getStats();

    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching database stats:', error);
    
    return res.status(500).json({
      total: 0,
      lastUpdate: null,
      error: 'Internal server error',
    });
  }
}