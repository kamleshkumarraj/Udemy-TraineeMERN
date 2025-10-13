import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/auth/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.route("/login").post(login);
authRouter.route("/logout").post(isLoggedIn, logout);
authRouter.route("/register").post(register);
authRouter.route('/profile').get(isLoggedIn,getProfile)
