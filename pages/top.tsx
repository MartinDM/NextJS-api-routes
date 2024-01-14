import { InferGetStaticPropsType } from 'next';
import clientPromise from '../lib/mongodb';
import { ObjectId } from 'mongodb';

export default function Movies({
  movies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <h1>Top 1000 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ol>
        {movies.map((movie) => (
          <li>
            <h2>{movie.title}</h2>
            <h3>{movie.metacritic}</h3>
            <p>{movie.plot}</p>
          </li>
        ))}
      </ol>
      <style jsx global>{`
        html,
        body {
          background: #fefefe;
          padding: 12px;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

// In prod build, enables server-side render with getStaticProps method.
export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix');

    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(1000)
      .toArray();
    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}
