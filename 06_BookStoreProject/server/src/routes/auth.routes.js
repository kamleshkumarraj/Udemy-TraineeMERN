import { Router } from "express";
import { changePassword, getUserProfile, loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.route('/register').post(registerUser);
authRouter.route('/login').post(loginUser);
authRouter.route('/logout').post(logoutUser);
authRouter.route('/change-password').patch(changePassword)
authRouter.route('/get-profile').get(getUserProfile);
authRouter.route('/update-profile').patch(updateUserProfile);