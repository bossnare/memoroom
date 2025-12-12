import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const client = new Client({
  connectionString: process.env.DATABASE_URL!,
  // avoid ssl reject supabase
  ssl: { rejectUnauthorized: false },
});
// connect client to db
await client.connect();

export const db = drizzle(client, { schema }); // important, drizzle need it *schema* for .query
