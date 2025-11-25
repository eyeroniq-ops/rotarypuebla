import { Pool } from 'pg';

// Using the provided connection string. 
// In a production environment, it is best practice to use process.env.DATABASE_URL
const connectionString = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_rDJWIvH7Q1fZ@ep-icy-water-ae0115ox-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require";

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false // Required for some cloud Postgres providers
  }
});
