import { Router } from "express";
import { createBook, deleteBook, getAllBooks, updateBook } from "../../controllers/admin/books.controller.js";
import { isAdmin, isLoggedIn } from "../../middlewares/auth.middleware.js";

export const bookHandleByAdminRoute = Router();

bookHandleByAdminRoute.route('/create-book').post(isLoggedIn, isAdmin, createBook);
bookHandleByAdminRoute.route('/update-book').patch(isLoggedIn, isAdmin, updateBook);
bookHandleByAdminRoute.route('/delete-book').delete(isLoggedIn, isAdmin, deleteBook);
bookHandleByAdminRoute.route('/get-books').get(isLoggedIn, isAdmin, getAllBooks);