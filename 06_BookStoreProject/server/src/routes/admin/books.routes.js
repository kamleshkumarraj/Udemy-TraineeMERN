import { Router } from "express";
import { createBook, deleteBook, getAllBooks, updateBook } from "../../controllers/admin/books.controller.js";

export const bookHandleByAdminRoute = Router();

bookHandleByAdminRoute.route('/create-book').post(createBook);
bookHandleByAdminRoute.route('/update-book').post(updateBook);
bookHandleByAdminRoute.route('/delete-book').delete(deleteBook);
bookHandleByAdminRoute.route('/get-books').patch(getAllBooks);