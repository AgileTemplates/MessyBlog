import { Pool } from 'pg';

export async function handler(req) {
  //
  // Get params
  const { title, content } = JSON.parse(req.body);

  // Connect to database
  const ssl = { rejectUnauthorized: false };
  const connectionString = process.env.DATABASE_URL;
  const database = new Pool({ connectionString, ssl });

  try {
    // Add a new post
    await database.query(
      `insert into posts (title, content, date) values ($1, $2, now())`,
      [title, content]
    );

    // End the connection and return a success (200) response
    await database.end();
    return { statusCode: 200 };

    // If error, return error
  } catch (err) {
    await database.end();
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
