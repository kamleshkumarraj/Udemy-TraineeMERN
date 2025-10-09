import { asyncErrorHandler } from "../../errors/asyncErrorHandler.js";
import { ErrorHandler } from "../../errors/error.js";
import {v4 as uuid} from 'uuid'
import fs from "fs/promises";

// now we write code for creating a book.
export const createBook = asyncErrorHandler(async (req, res, next) => {
  const { title, author, genre, price, year, qty} = req.body;
  if (!title || !author || !genre || !price || !year || !qty) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // first we read the existing data from the file.
  const bookDataContent =
    JSON.parse(
      await fs.readFile("./src/data/books/books.json", "utf-8")
    ) || [];

  const newBook = {
    id: uuid(),
    title,
    author,
    genre,
    price,
    year,
    createdAt : new Date().toISOString(),
    createdBy : req?.user?._id,
    qty
  };

  bookDataContent.push(newBook);

  // now we write the data to the file.
  await fs.writeFile(
    "./src/data/books/books.json",
    JSON.stringify(bookDataContent)
  );

  res.status(200).json({
    success: true,
    message: "Book created successfully",
    data: { title, author, genre, price,  },
  })
});

// now we write api for deleting a book.
export const deleteBook = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;

  // first we read the existing data from the file.
  const bookDataContent =
    JSON.parse(
      await fs.readFile("./src/data/books/books.json", "utf-8")
    ) || [];

  const book = bookDataContent.find((book) => book.id === id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  bookDataContent.splice(bookDataContent.indexOf(book), 1);

  // now we write the data to the file.
  await fs.writeFile(
    "./src/data/books/books.json",
    JSON.stringify(bookDataContent)
  );

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
  });
});

// now we write api for updating a book.
export const updateBook = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.query;

  // first we read the existing data from the file.
  const bookDataContent =
    JSON.parse(
      await fs.readFile("./src/data/books/books.json", "utf-8")
    ) || [];

  const book = bookDataContent.find((book) => book.id === id);

  if (!book) {
    return next(new ErrorHandler("Book not found", 404));
  }

  // update only that fields which are passed in the request body.
  for (let key in req.body) {
    if (book.hasOwnProperty(key) && key !== "id") {
      book[key] = req.body[key];
    }
  }

  // now we write the data to the file.
  await fs.writeFile(
    "./src/data/books/books.json",
    JSON.stringify(bookDataContent)
  );

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});
// now we write api for getting all books.
export const getAllBooks = asyncErrorHandler(async (req, res, next) => {
  // first we read the existing data from the file.
  const bookDataContent =
    JSON.parse(
      await fs.readFile("./src/data/books/books.json", "utf-8")
    ) || [];

  res.status(200).json({
    success: true,
    message: "Books fetched successfully",
    data: bookDataContent,
  });
});
  