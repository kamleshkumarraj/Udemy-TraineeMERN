import mongoose from "mongoose";

import { ErrorHandler } from "../../errors/apiError.error.js";
import { asyncErrorHandler } from "../../errors/asyncErrorHanlder.error.js";
import { removeFile, uploadMultipleFilesOnCloudinary } from "../../helper/helper.js";
import { Users } from "../../models/users.model.js";
import { Student } from "../models/student.model.js";
import { loginWithJWT } from "../utils/loginUsingJwt.utils.js";

// controller for register student or faculty.
export const register = asyncErrorHandler(async (req, res, next) => {

  const {firstName, lastName, email, username, password, role} = req.body;
  const avatar = req.file;

  // first we check if user is already registered or not.
  const existingUser = await Users.findOne({$or: [{ email }, { username }] });

  if (existingUser) return next(new ErrorHandler("User already registered !", 400));

  if (!avatar) return next(new ErrorHandler("Avatar is required !", 400));

  //upload avatar on cloudinary.
  const { success, results } = await uploadMultipleFilesOnCloudinary([avatar]);
  
  if (!success) return next(new ErrorHandler(results, 400));

  const public_id = results[0].public_id;
  const url = results[0].url;

  await removeFile([avatar]);

   // now we create user.
  await Users.create({
    firstName,
    lastName,
    email,
    username,
    password,
    role : 'user',
    avatar : {
      public_id,
      url,
    }

  })

  res.status(200).json({
    success: true,
    message: `${role} registered successfully !`,
  });

});

// now we write controller for login student.
export const login = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password, role } = req.body;
  // first we check student is registered or not.
  const user = await User.findOne({
    $or: [{ email: email }, { username: username }],
  }).select("+password");

  if(user?.role !== role) return next(new ErrorHandler("Invalid credentials !", 400));


  // console.log(student);

  if (!user) return next(new ErrorHandler("Invalid credentials !", 400));

  // if student is registered the we compare the password.
  if (!(await user.comparePassword(password)))
    return next(new ErrorHandler("Invalid credentials !", 400));

  // if password is correct then we login the student.
  loginWithJWT(user, res);
});

// now we write controller for logout student.
export const logout = asyncErrorHandler(async (req, res, next) => {
  req.user = undefined;
  res.clearCookie("token").status(200).json({
    success: true,
    message: "User logged out successfully.",
  });
});



// now we write controller for update the student avatar.
export const updateAvatar = asyncErrorHandler(async (req, res, next) => {
  const id = req?.user;
  const avatar = req.file;

  if (!mongoose.isValidObjectId(id))
    return next(new ErrorHandler("Invalid user id !", 400));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("User not found !", 404));

  // first we delete the existing avatar.
  if (user?.avatar?.public_id) {
    const { success, error } = await removeMultipleFileFromCloudinary([
      user?.avatar?.public_id,
    ]);

    if (!success) return next(new ErrorHandler(error, 400));
  }

  // now we upload new avatar on cloudinary.
  const { success, results } = await uploadMultipleFilesOnCloudinary([avatar]);

  if (!success) return next(new ErrorHandler(error, 400));

  const public_id = results[0].public_id;
  const url = results[0].url;

  await Student.findOneAndUpdate(
    { _id: id },
    { avatar: { public_id, url } },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Avatar updated successfully !",
  });
});

// now we write controller for updating the profile.

export const directLogin = asyncErrorHandler(async (req, res, next) => {
  const user = await User.findById(req.user,{role : 1, _id : 0}).lean();
  res.status(200).json({
    success: true,
    message: "User logged in successfully.",
    data: user,
  });
})