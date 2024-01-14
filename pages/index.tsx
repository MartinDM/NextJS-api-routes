import Head from 'next/head';
import clientPromise from '../lib/mongodb';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<
  ConnectionStatus
> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <Head>
        <title>Movies Endpoint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Martin's Movies endpoint using Next.js and MongoDB! 🎞️
        </h1>

        {isConnected ? (
          <h2 className="subtitle">Connected to Movies DB</h2>
        ) : (
          <h2 className="subtitle">No connection made 🙅‍♂️</h2>
        )}

        <div className="grid">
          <a href="top" className="card">
            <h3>🎞️ Top 1000 &rarr;</h3>
            <p>Return the top 1000 movies from MongoDB</p>
          </a>

          <a href="movies" className="card">
            <h3>Top 20 &rarr;</h3>
            <p>Return the top 20 (server-side rendered) 🚀</p>
          </a>

          <a href="api/movies" className="card">
            <h3>API: 100 movies as JSON &rarr;</h3>
            <p>
              Navigate to <code>/api/[year]</code> to get up to 20 movies for
              that query
            </p>
          </a>

          <a href="api/movies/2000" className="card">
            <h3>API: Query [year] &rarr;</h3>
            <p>
              Navigate to <code>/api/movies/[year]</code> to get up to 20 movies
              for that year
            </p>
          </a>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          color: #417dc4;
          text-decoration: none;
          line-height: 1.15;
          font-size: 3rem;
        }

        .subtitle {
          font-size: 2rem;
          color: #59af57;
        }

        .description {
          line-height: 1.5;
          font-size: 1.2rem;

          a {
            text-decoration: underline;
            color: cornflowerblue;
          }
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          background: #fefefe;
          padding: 0;
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
