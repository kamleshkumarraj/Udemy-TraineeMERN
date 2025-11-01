import crypto from 'node:crypto';
import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { Users } from '../models/users.model.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.utils.js';
import { deleteFile } from '../utils/file.utils.js';
import { generateEmailVerification } from '../utils/generateEmailVerification.js';
import { sendResponse } from '../utils/response.utility.js';
import { sendMail } from '../utils/sendMail.utils.js';
import { Session } from '../models/session.models.js';

export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const {fullName, email, username, password, role = 'user' } = req.body;
  const avatar = req.file;
  // console.log(fullName, email, username, password, role, avatar);

  // first we check if user is already registered or not.
  const existingUser = await Users.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return next(new ErrorHandler('User already exists', 400));
  }
  // now we create transaction for if user is created then in this case profile create other wise created profile will rollback.

  
    const { success, data } = await uploadFileOnCloudinary([avatar]);
    console.log(data)
    if (!success) {
      await deleteFile([avatar]);
      return next(new ErrorHandler("get error during file upload", 400));
    }

    const user = await Users.create({
      fullName,
      email,
      username,
      password,
      role,
      avatar: data[0],
    });

    await deleteFile([avatar]);

    // now we send email verification mail.
    const token = user.generateEmailVerificationToken();
    const origin = req.headers.origin;
    const url = `${origin}/api/v1/verify-email/${token}`;
    const message = generateEmailVerification(url, user.fullName);

    try {
      await sendMail({message, subject : "Email verification", to : user.email});
      await user.save();
    } catch (error) {
      user.emailVerificationToken = null;
      user.emailVerificationTokenExpiry = null;
      await user.save();
    }
    // const port =

    sendResponse(res, 'User registered successfully !', user, 200);
  
});

export const verifyEmail = asyncErrorHandler(async (req, res, next) => {
  const verifyToken = req.params.verifyToken;
  const token = crypto.createHash('sha256').update(verifyToken).digest('hex');
  const user = await Users.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return next(new ErrorHandler('Invalid token', 400));
  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationTokenExpiry = null;
  await user.save();
  sendResponse(res, 'Email verified successfully !', user, 200);
  
});
