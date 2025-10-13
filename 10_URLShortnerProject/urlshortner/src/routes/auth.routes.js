import { Router } from "express";
import {
  login,
  logout,
  register,
} from "../controllers/auth/auth.controller.js";

export const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/logout").post(logout);
authRouter.route("/register").post(register);
