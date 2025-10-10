import { v4 as uuid } from 'uuid';
import { asyncErrorHandler } from "../../errors/asyncErrorHandler.js";
import { ErrorHandler } from "../../errors/error.js";
import { booksTable } from "../../schema/books.schema.js";

// now we write code for creating a book.
export const createBook = asyncErrorHandler(async (req, res, next) => {
  const { title, author, genre, price, year, qty, description} = req.body;
  if (!title || !author || !genre || !price || !year || !qty || !description) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const newBook = {
    id: uuid(),
    title,
    author,
    genre,
    price,
    year,
    createdAt : new Date().toISOString(),
    createdBy : req?.user?._id,
    qty,
    description
  };

  // we write query for inserting a book.
  await db.insert(booksTable).values(newBook);

  res.status(200).json({
    success: true,
    message: "Book created successfully",
    data: { title, author, genre, price,  },
  })
});

// now we write api for deleting a book.
export const deleteBook = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  // we write query for deleting a book.
  await db.delete(booksTable).where(eq(booksTable.id, id));

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

// now we write api for updating a book.
export const updateBook = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.query;
  const updatedContent = req.body;

  if(updatedContent?.id) delete updatedContent.id;

  // first we read the existing data from the file.
  const book = await db
    .update(booksTable)
    .set(updatedContent)
    .where(eq(booksTable.id, id))
    .returning();

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});
// now we write api for getting all books.
export const getAllBooks = asyncErrorHandler(async (req, res, next) => {
  // first we read the existing data from the file.
  const bookDataContent = await db.select().from(booksTable);

  res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: bookDataContent,
  });
});
  