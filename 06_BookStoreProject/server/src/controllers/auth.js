// first we write code for register the user on our website.

import { asyncErrorHandler } from "../errors/asyncErrorHandler.js";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../constant.js";

// now we write code for register the user.
export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, address } = req.body;

  if (!firstName || !lastName || !email || !password || !address) {
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
  };

  // first we read the existing data from the file.
  const userDataContent =
    JSON.parse(
      await fs.readFile("../../public/data/users/users.json", "utf-8")
    ) || [];

  userDataContent.push(userData);

  // now we write the data to the file.
  await fs.writeFile(
    "../../public/data/users/users.json",
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
      await fs.readFile("../../public/data/users/users.json", "utf-8")
    ) || [];

  const user = userDataContent.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }

  // we create like jsonwebtoken using userdata id and email and using secret key.
  const SECRET_KEY = SECRET_KEY;
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
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
