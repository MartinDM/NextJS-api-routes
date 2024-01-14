import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.year) {
    try {
      const client = await clientPromise;
      const db = client.db('sample_mflix');
      const { year } = req.query;
      const movies = await db
        .collection('movies')
        //.find({ _id: new ObjectId(req.query.id as string) })
        .find({ year: +year })
        .sort({ metacritic: -1 })
        .toArray();
      res.send(movies);
    } catch (e) {
      console.error(e);
    }
  }
};
