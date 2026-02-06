import { Handler } from '@netlify/functions';
import { pool } from './db';

export const handler: Handler = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        title, 
        date_str as "date", 
        time_str as "time", 
        location, 
        description, 
        image_url as "imageUrl"
      FROM events
      ORDER BY id ASC
    `);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch events' }),
    };
  }
};
