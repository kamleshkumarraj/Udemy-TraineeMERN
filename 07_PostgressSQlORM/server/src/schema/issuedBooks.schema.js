
import {pgTable, uuid} from 'drizzle-orm/pg-core'
import { booksTable } from './books.schema.js'
import { issuedDetails } from './issuedDetailschema.js'

export const issuedBookTable = pgTable('issuedBooks', {
  id: uuid().primaryKey(),
  books : uuid().references(() => booksTable.id).notNull(),
  issueDetails : uuid().references(() => issuedDetails.id).notNull()
})

