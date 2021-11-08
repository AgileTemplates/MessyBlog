import { Pool } from 'pg';
import generateDB from './config/generateDB';

export async function handler(req) {
  //
  // Make sure the DATABASE_URL is set in the .env file
  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'No database found (see .env.example file)',
      }),
    };
  }

  // Connect to the database
  const ssl = { rejectUnauthorized: false };
  const connectionString = process.env.DATABASE_URL;
  const database = new Pool({ connectionString, ssl });

  try {
    // Fetch all posts
    const result = await database.query(
      'SELECT * FROM posts ORDER BY date desc;'
    );

    // Close the connection and return the result
    await database.end();
    return {
      statusCode: 200,
      body: JSON.stringify({ data: { data: [result] } }),
    };

    // If there is no table, create one with some mock data
  } catch (err) {
    if (err.message === `relation "posts" does not exist`) {
      generateDB(database);
      return await handler(req);
    }

    // If error, return error
    await database.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
