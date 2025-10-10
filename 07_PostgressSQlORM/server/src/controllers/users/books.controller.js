import { asyncErrorHandler } from "../../errors/asyncErrorHandler.js";
import fs from "fs/promises";
import { ErrorHandler } from "../../errors/error.js";
import { v4 as uuid } from "uuid";
import { issuedDetails} from "../../schema/issuedDetailschema.js";
import { issuedBookTable } from "../../schema/issuedBooks.schema.js";
import { db } from "../../db/index.js";
import { booksTable } from "../../schema/books.schema.js";
import { and, gt, inArray } from "drizzle-orm";

// we write api for issue the book.
export const issueBook = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { bookId } = req.body || [];

  if (!bookId || bookId.length === 0) {
    return next(new ErrorHandler("Book ID is required", 400));
  }

  const now = new Date();
  const returnDate = new Date(now.getTime() + 7*24*60*60*1000);

  const issuedData = {
    id: uuid(),
    issuedBy: userId,
    issueDate: now,
    returnDate: returnDate,
  };

  // insert issued record
  await db.insert(issuedDetails).values(issuedData);

  // fetch books with qty > 0
  const availableBooks = await db
    .select()
    .from(booksTable)
    .where(inArray(booksTable.id, bookId), gt(booksTable.qty, 0));

  if (!availableBooks.length) {
    return next(new ErrorHandler("Selected books are not available", 400));
  }

  // create issuedBook rows
  const issuedBookRows = availableBooks.map(({ id }) => ({
    id: uuid(),
    bookId: id,
    issuedBookId: issuedData.id,
  }));

  // decrease quantity of books
  const bookIdsToUpdate = issuedBookRows.map((b) => b.bookId);

  await db
    .update(booksTable)
    .set({ qty: booksTable.qty - 1 })
    .where(inArray(booksTable.id, bookIdsToUpdate));

  // insert issuedBook items
  await db.insert(issuedBookTable).values(issuedBookRows);

  res.status(200).json({
    success: true,
    message: "Books issued successfully",
    data: issuedBookRows,
  });
});


// now we write api for returning a book
export const returnBook = asyncErrorHandler(async (req, res, next) => {
  
});

// now we write endpoint for getting all my issued books.
export const getAllIssuedBooks = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  // we write query for getting all issued book and issuedDetials is created by me.
  const issuedBooks = await db
  .select()
  .from(issuedBookTable)
  .leftJoin(
    issuedDetails,
    issuedDetails.id.eq(issuedBookTable.issuedBookId)
  )
  .where(issuedDetails.issuedBy.eq(userId));

  res.status(200).json({
    success: true,
    message: "Issued books fetched successfully",
    data: issuedBooks,
  });
});
