import mongoose from 'mongoose';
import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { userProfile } from '../models/userProfile.model.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.utils.js';
import { Users } from '../models/users.model.js';
import { sendResponse } from '../utils/response.utility.js';
import { deleteFile } from '../utils/file.utils.js';
import { generateEmailVerification } from '../utils/generateEmailVerification.js';
import crypto from 'node:crypto';

export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { email, username, password, role = 'userProfile', profile } = req.body;
  const avatar = req.file;

  // first we check if user is already registered or not.
  const existingUser = await Users.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return next(new ErrorHandler('User already exists', 400));
  }
  let profileSchema;
  if (role == 'userProfile') profileSchema = userProfile;
  // now we create transaction for if user is created then in this case profile create other wise created profile will rollback.

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const profile = await profileSchema.create(profile);

    // now we upload image on cloudinary.
    const { success, data } = await uploadFileOnCloudinary([avatar]);
    if (!success) throw new Error(data);

    const user = await Users.create({
      email,
      username,
      password,
      role,
      profile,
      avatar: data[0],
    });

    deleteFile(avatar);

    await session.commitTransaction();
    session.endSession();

    // now we send email verification mail.
    const token = user.generateEmailVerificationToken();
    const origin = req.headers.origin;
    const url = `${origin}/api/v1/verify-email/${token}`;
    const message = generateEmailVerification(url);

    try {
      await sendEmail(email, 'Verify your email', message);
      await user.save();
    } catch (error) {
      user.emailVerificationToken = null;
      user.emailVerificationTokenExpiry = null;
      await user.save();
    }
    // const port =

    sendResponse(res, 'User registered successfully !', user, 200);
  } catch (error) {
    deleteFile(avatar);
    session.abortTransaction();
    session.endSession();
    return next(new ErrorHandler(error.message, 400));
  }
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
