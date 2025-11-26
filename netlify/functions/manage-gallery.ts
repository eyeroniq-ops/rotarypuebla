import { Handler } from '@netlify/functions';
import { pool } from './db';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body || '{}');

  try {
    if (event.httpMethod === 'POST') {
      const { imageUrl, caption, isInstagram, link } = body;
      const result = await pool.query(
        `INSERT INTO gallery_items (image_url, caption, is_instagram, link)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [imageUrl, caption, isInstagram || false, link || '']
      );
      return { statusCode: 201, body: JSON.stringify(result.rows[0]) };

    } else if (event.httpMethod === 'DELETE') {
      const { id } = body;
      await pool.query('DELETE FROM gallery_items WHERE id = $1', [id]);
      return { statusCode: 200, body: JSON.stringify({ message: 'Item deleted' }) };
    }
  } catch (error) {
    console.error('Gallery operation error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }

  return { statusCode: 400, body: 'Bad Request' };
};