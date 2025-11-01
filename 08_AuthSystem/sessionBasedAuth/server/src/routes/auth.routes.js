import { Router } from 'express';
import { upload } from '../utils/multer.utils.js';
import {
  loginValidator,
  registerValidator,
  validator,
} from '../validators/register.validator.js';
import {
  login,
  registerUser,
  verifyEmail,
} from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter
  .route('/register')
  .post(upload.single('avatar'), registerValidator, validator, registerUser);

authRouter
  .route('/verify-email/:verifyToken')
  .get(loginValidator, validator, verifyEmail);

authRouter.route('/login').post(login);
