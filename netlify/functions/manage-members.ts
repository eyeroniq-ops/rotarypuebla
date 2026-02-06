import { Handler } from '@netlify/functions';
import { pool } from './db';

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'PUT' && event.httpMethod !== 'DELETE') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body || '{}');

  try {
    if (event.httpMethod === 'POST') {
      // INSERT MEMBER
      const { name, role, profession, shortDescription, businessHelp, imageUrl, email, whatsapp, birthday, businessUrl, socials, imageSettings } = body;
      const result = await pool.query(
        `INSERT INTO members (name, role, profession, short_description, business_help, image_url, email, whatsapp, birthday, business_url, socials, image_settings)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [name, role, profession, shortDescription, businessHelp, imageUrl, email, whatsapp, birthday, businessUrl, JSON.stringify(socials), JSON.stringify(imageSettings || {})]
      );
      return { statusCode: 201, body: JSON.stringify(result.rows[0]) };

    } else if (event.httpMethod === 'PUT') {
      // UPDATE MEMBER
      const { id, name, role, profession, shortDescription, businessHelp, imageUrl, email, whatsapp, birthday, businessUrl, socials, imageSettings } = body;
      const result = await pool.query(
        `UPDATE members SET 
           name=$1, role=$2, profession=$3, short_description=$4, business_help=$5, 
           image_url=$6, email=$7, whatsapp=$8, birthday=$9, business_url=$10, socials=$11, image_settings=$12
         WHERE id=$13 RETURNING *`,
        [name, role, profession, shortDescription, businessHelp, imageUrl, email, whatsapp, birthday, businessUrl, JSON.stringify(socials), JSON.stringify(imageSettings || {}), id]
      );
      return { statusCode: 200, body: JSON.stringify(result.rows[0]) };

    } else if (event.httpMethod === 'DELETE') {
      // DELETE MEMBER
      const { id } = body;
      await pool.query('DELETE FROM members WHERE id = $1', [id]);
      return { statusCode: 200, body: JSON.stringify({ message: 'Member deleted' }) };
    }
  } catch (error) {
    console.error('Member operation error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
  }

  return { statusCode: 400, body: 'Bad Request' };
};