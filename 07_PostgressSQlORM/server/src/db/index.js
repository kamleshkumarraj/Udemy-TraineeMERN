import {drizzle} from 'drizzle-orm/node-postgres'

export const connectDB = async () => {
  return drizzle(process.env.DATABASE_URL)
}