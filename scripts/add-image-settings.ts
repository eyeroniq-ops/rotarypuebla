
import { Pool } from 'pg';

const connectionString =
    process.env.NETLIFY_DATABASE_URL ||
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_rDJWIvH7Q1fZ@ep-icy-water-ae0115ox-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

if (!connectionString) {
    console.error('No DATABASE_URL found.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

(async () => {
    try {
        console.log('Adding image_settings column to members table...');

        await pool.query(`
            ALTER TABLE members 
            ADD COLUMN IF NOT EXISTS image_settings JSONB DEFAULT '{}'::jsonb;
        `);

        console.log('Column added successfully (or verified).');
    } catch (err) {
        console.error('Error migrating DB:', err);
    } finally {
        await pool.end();
    }
})();
