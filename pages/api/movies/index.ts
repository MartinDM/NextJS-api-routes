import { NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiResponse, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');
    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(100)
      .toArray();
    res.json(movies);
  } catch (e) {
    console.error(e);
  }
};
