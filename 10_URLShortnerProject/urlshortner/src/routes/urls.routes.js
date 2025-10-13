import { Router } from "express";
import { minimizeURL } from "../controllers/users/urlHandler.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const urlHandlerRouter = Router();

urlHandlerRouter.route('/short-url').post(isLoggedIn,minimizeURL);