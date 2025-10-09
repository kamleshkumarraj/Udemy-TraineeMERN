import { Router } from "express";
import { issueBook, returnBook } from "../../controllers/users/books.controller";
import { isLoggedIn } from "../../middlewares/auth.middleware";

export const bookHandleByUserRoute = Router();

bookHandleByUserRoute.route('/issue-book').post(isLoggedIn, issueBook);
bookHandleByUserRoute.route('/return-book').post(isLoggedIn, returnBook);