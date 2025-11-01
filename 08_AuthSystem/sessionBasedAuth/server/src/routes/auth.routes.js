import { Router } from 'express';
import { upload } from '../utils/multer.utils.js';
import {
  registerValidator,
  validateRegister,
} from '../validators/register.validator.js';
import { registerUser, verifyEmail } from '../controllers/auth.controller.js';

export const authRouter = Router();

authRouter.route('/register').post(
  upload.single('avatar'),
  registerValidator,
  validateRegister,

  registerUser,
);

authRouter.route('/verify-email/:verifyToken').get(verifyEmail);
