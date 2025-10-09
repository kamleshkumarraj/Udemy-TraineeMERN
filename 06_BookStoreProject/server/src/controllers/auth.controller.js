// first we write code for register the user on our website.

import bcrypt from "bcrypt";
import fs from "fs/promises";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { SECRET_KEY } from "../constant.js";
import { asyncErrorHandler } from "../errors/asyncErrorHandler.js";
import { ErrorHandler } from "../errors/error.js";

// now we write code for register the user.
export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, address,role } = req.body;

  if (!firstName || !lastName || !email || !password || !address || !role) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const _id = uuid(); // unique id generate for each user.
  // now we hash the password before saving to the file.
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = {
    _id,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    address,
    role
  };

  // first we read the existing data from the file.
  const userDataContent =
    JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
    ) || [];

  userDataContent.push(userData);

  // now we write the data to the file.
  await fs.writeFile(
    "./src/data/users/users.json",
    JSON.stringify(userDataContent)
  );

  res.status(200).json({
    success: true,
    message: "User registered successfully",
    data: userData,
  });
});

// now we write code for login the user
export const loginUser = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // first we read the existing data from the file.
  const userDataContent =
    JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
    ) || [];

  const user = userDataContent.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  // we create like jsonwebtoken using userdata id and email and using secret key.
  const token = jwt.sign({ _id: user._id, email: user.email }, SECRET_KEY, {
    expiresIn: "1d",
  });
  // now we set the token in the cookie.
  res.cookie("token", token).status(200).json({
    success: true,
    message: "User logged in successfully",
    data: {
      token,
    },
  });
});

// now we write code for logout the user
export const logoutUser = asyncErrorHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

// now we write code for get user profile
export const getUserProfile = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id; // we get the user from the auth middleware.
  console.log(userId)
  // fetch user from the file using userId
  const userDataContent =
    JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
    ) || [];
    console.log(userDataContent)
  const user = userDataContent.find((user) => user._id === userId);

  if(!user) return next(new ErrorHandler("User not found", 400));

  res.status(200).json({
    success: true,
    message: "User profile fetched successfully",
    data: user,
  });
});

// now we write api for update user profile
export const updateUserProfile = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id; // we get the user from the auth middleware.
  const data = req.body;

  // fetch user from the file using userId
  const userDataContent =
    JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
    ) || [];

  const user = userDataContent.find((user) => user._id === userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  // update only that fields which are passed in the request body.
  for (let key in data) {
    if (user.hasOwnProperty(key) && key !== "_id" && key !== "password") {
      user[key] = data[key];
    }
  }

  await fs.writeFile(
    "./src/data/users/users.json",
    JSON.stringify(userDataContent)
  );

  res.status(200).json({
    success: true,
    message: "User profile updated successfully",
    data: user,
  });
});

// now we write api for change password.
export const changePassword = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user._id; // we get the user from the auth middleware.
  const { oldPassword, newPassword } = req.body;

  // fetch user from the file using userId
  const userDataContent =
    JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
    ) || [];

  const user = userDataContent.find((user) => user._id === userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid old password",
    });
  }

  user.password = await bcrypt.hash(newPassword, 10);

  await fs.writeFile(
    "./src/data/users/users.json",
    JSON.stringify(userDataContent)
  );

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// now we write api for delete user profile
export const deleteUserProfile = asyncErrorHandler(async (req, res, next) => {
  const userId = req.user; // we get the user from the auth middleware.

  // fetch user from the file using userId
  const userDataContent =
    JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
    ) || [];

  const user = userDataContent.find((user) => user._id === userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  userDataContent.splice(userDataContent.indexOf(user), 1);

  await fs.writeFile(
    "./src/data/users/users.json",
    JSON.stringify(userDataContent)
  );

  res.status(200).json({
    success: true,
    message: "User profile deleted successfully",
  });
});
