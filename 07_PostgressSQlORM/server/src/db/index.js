import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

export const connectDB = async () => {
  try {
    await pool.query('SELECT 1'); // Real DB connection attempt
    console.log('Database connected successfully ✅');
  } catch (err) {
    console.error('Database connection failed ❌', err.message);
  }
}
