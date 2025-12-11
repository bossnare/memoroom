import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  // avoid ssl reject supabase
  ssl: { rejectUnauthorized: false },
});
// connect pool to db
await pool.connect();

export const db = drizzle(pool, { schema }); // important, drizzle need it *schema* for .query
