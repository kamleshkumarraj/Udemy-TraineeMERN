import mongoose from 'mongoose';
import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { userProfile } from '../models/userProfile.model.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.utils.js';
import { Users } from '../models/users.model.js';
import { sendResponse } from '../utils/response.utility.js';
import { deleteFile } from '../utils/file.utils.js';

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
    
    sendResponse(res, 'User registered successfully !', user, 200);
  } catch (error) {
    deleteFile(avatar);
    session.abortTransaction();
    session.endSession();
    return next(new ErrorHandler(error.message, 400));
  }
});
