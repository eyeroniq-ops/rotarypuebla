import { Handler } from '@netlify/functions';
import { pool } from './db';

export const handler: Handler = async (event, context) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        name, 
        role, 
        profession, 
        short_description as "shortDescription", 
        business_help as "businessHelp", 
        image_url as "imageUrl", 
        email, 
        whatsapp, 
        birthday, 
        business_url as "businessUrl", 
        socials,
        image_settings as "imageSettings"
      FROM members
      ORDER BY name ASC
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
      body: JSON.stringify({ error: 'Failed to fetch members' }),
    };
  }
};
