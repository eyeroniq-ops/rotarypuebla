import { Pool } from 'pg';

// Netlify automatically injects 'NETLIFY_DATABASE_URL' (pooled) when using the Neon integration.
// We fall back to the manual string provided if the env var isn't present.
// Note: For Serverless functions, always use the POOLED connection string (port 5432, -pooler host).
const connectionString = 
  process.env.NETLIFY_DATABASE_URL || 
  process.env.DATABASE_URL || 
  "postgresql://neondb_owner:npg_rDJWIvH7Q1fZ@ep-icy-water-ae0115ox-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false 
  },
  max: 10, // Limit pool size for serverless
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});