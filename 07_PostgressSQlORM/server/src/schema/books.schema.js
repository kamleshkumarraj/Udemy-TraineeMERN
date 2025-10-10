// now we create a schema for books.

import { pgTable, integer, varchar, text, uuid, timestamp } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: uuid().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  price : integer("price").notNull(),
  genre: varchar("genre", { length: 255 }).notNull(),
  year: integer("year").notNull(),
  qty: integer("qty").notNull().default(5),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})