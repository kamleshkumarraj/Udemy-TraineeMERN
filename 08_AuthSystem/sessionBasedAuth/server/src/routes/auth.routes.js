import { Router } from 'express';
import { upload } from '../utils/multer.utils.js';
import {
  loginValidator,
  registerValidator,
  validator,
} from '../validators/register.validator.js';
import {
  forgotPassword,
  login,
  logout,
  registerUser,
  resetPassword,
  sendOtpForMailVerification,
  verifyEmail,
  verifyOtpForMailVerification,
} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter
  .route('/register')
  .post(upload.single('avatar'), registerValidator, validator, registerUser);

authRouter
  .route('/verify-email/:verifyToken')
  .get(loginValidator, validator, verifyEmail);

authRouter.route('/login').post(login);

authRouter.route('/send-otp').post(sendOtpForMailVerification);
authRouter.route('/verify-otp').post(verifyOtpForMailVerification);
authRouter.route('/forgot-password').post(forgotPassword);
authRouter.route('/reset-password/:token').post(resetPassword);

authRouter.route('/logout').post(logout);
