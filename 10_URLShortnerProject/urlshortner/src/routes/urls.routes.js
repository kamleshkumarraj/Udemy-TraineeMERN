import { Router } from "express";
import { minimizeURL } from "../controllers/users/urlHandler.controller.js";

export const urlHandlerRouter = Router();

urlHandlerRouter.route('/short-url').post(minimizeURL);