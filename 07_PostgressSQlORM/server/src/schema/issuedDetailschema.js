// we write schema for issued books.
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema.js";

export const issuedDetails = pgTable("issuedDetails", {
  id: uuid().primaryKey(),
  issuedBy: uuid()
    .references(() => usersTable.id)
    .notNull(),
  issueDate: timestamp("issue_date").notNull(),
  // we add a books columns as an array and each elem is id of a book.
  returnData: timestamp("return_date").notNull(),
});
