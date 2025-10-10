import { Router } from "express";
import { changePassword, getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').post(logoutUser);
authRouter.route('/change-password').patch(isLoggedIn,changePassword)
authRouter.route('/get-profile').get(isLoggedIn,getUserProfile);
authRouter.route('/update-profile').patch(isLoggedIn,updateUserProfile);