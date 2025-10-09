export const issueBook = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { bookId } = req.body || [];
  if (bookId.length === 0) {
    return next(new ErrorHandler("Book ID is required", 400));
  }

  // fetch all books from the file that user want to issue.
  const bookDataContent =
    (
      JSON.parse(
        await fs.readFile("../../public/data/books/books.json", "utf-8")
      ) || []
    ).filter((book) => bookId.includes(book.id) && book?.qty > 0) || [];

  if (bookDataContent.length === 0) {
    return next(new ErrorHandler("No books found", 404));
  }

  // now we decrease book quantity and also write in file again.
  const allBooks =
    JSON.parse(
      await fs.readFile("../../public/data/books/books.json", "utf-8")
    ) || [];

  for (const book of bookDataContent) {
    const bookIndex = allBooks.findIndex((b) => b.id === book.id);
    if (bookIndex !== -1) {
      allBooks[bookIndex].qty -= 1;
    }
  }
  await fs.writeFile(
    "../../public/data/books/books.json",
    JSON.stringify(allBooks)
  );

  // first we check that user already exist in issued book then only we push the book in book array.
  const issuedBook = (
    JSON.parse(
      await fs.readFile(
        "../../public/data/issuedBooks/issuedBooks.json",
        "utf-8"
      )
    ) || []
  )?.find((issuedBook) => issuedBook.issuedBy === userId);

  // if issued book exist for user then we push the book in book array.
  if (issuedBook) {
    for (const book of bookDataContent) {
      if (!issuedBook.books.find((b) => b.id === book.id)) {
        issuedBook.books.push(book);
      }
    }
    await fs.writeFile(
      "../../public/data/issuedBooks/issuedBooks.json",
      JSON.stringify(issuedBook)
    );
    return res.status(200).json({
      success: true,
      message: "Books issued successfully",
      data: issuedBook,
    });
  }

  // we create a doc for issued book. where all books present in array and also provide issue date and issued by.
  const issuedBookDoc = {
    id: uuid(),
    books: bookDataContent,
    issuedBy: userId,
    issueDate: new Date().toISOString(),
  };

  // now we write the issued book doc to the file.
  const issuedBookDataContent =
    JSON.parse(
      await fs.readFile(
        "../../public/data/issuedBooks/issuedBooks.json",
        "utf-8"
      )
    ) || [];

  issuedBookDataContent.push(issuedBookDoc);

  await fs.writeFile(
    "../../public/data/issuedBooks/issuedBooks.json",
    JSON.stringify(issuedBookDataContent)
  );

  res.status(200).json({
    success: true,
    message: "Books issued successfully",
    data: issuedBookDoc,
  });
});
