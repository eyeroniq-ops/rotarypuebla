import { Handler } from '@netlify/functions';
import { pool } from './db';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'PUT' && event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body || '{}');

  try {
    if (event.httpMethod === 'POST') {
      const { title, date, time, location, description, imageUrl } = body;
      const result = await pool.query(
        `INSERT INTO events (title, date_str, time_str, location, description, image_url)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [title, date, time, location, description, imageUrl]
      );
      return { statusCode: 201, body: JSON.stringify(result.rows[0]) };

    } else if (event.httpMethod === 'PUT') {
      const { id, title, date, time, location, description, imageUrl } = body;
      const result = await pool.query(
        `UPDATE events SET 
           title=$1, date_str=$2, time_str=$3, location=$4, description=$5, image_url=$6
         WHERE id=$7 RETURNING *`,
        [title, date, time, location, description, imageUrl, id]
      );
      return { statusCode: 200, body: JSON.stringify(result.rows[0]) };

    } else if (event.httpMethod === 'DELETE') {
      const { id } = body;
      await pool.query('DELETE FROM events WHERE id = $1', [id]);
      return { statusCode: 200, body: JSON.stringify({ message: 'Event deleted' }) };
    }
  } catch (error) {
    console.error('Event operation error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }

  return { statusCode: 400, body: 'Bad Request' };
};