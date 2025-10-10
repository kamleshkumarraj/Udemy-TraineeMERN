import dotenv from 'dotenv';
dotenv.config({
  path : "./.env"
})

import {defineConfig} from 'drizzle-kit'

export default defineConfig({
  schema: './src/schema/',
  out: './drizzle',
  driver: 'pg',
  dialect : "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
})