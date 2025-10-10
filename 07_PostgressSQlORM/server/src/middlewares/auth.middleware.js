import { SECRET_KEY } from "../constant.js";
import { asyncErrorHandler } from "../errors/asyncErrorHandler.js";
import jwt from 'jsonwebtoken'
import fs from 'fs/promises'

// we write middleware for verify user is logged in or not.
export const isLoggedIn = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Error("You are not logged in", 401));
  }

  // now we verify the token and extract data and save in req object.
  const decoded = jwt.verify(token, SECRET_KEY);
  // console.log(decoded)
  // if token is not valid then throw error.
  if (!decoded) {
    return next(new Error("You are not logged in", 401));
  }

  req.user = decoded;
  next();
})

export const isAdmin = asyncErrorHandler(async (req, res, next) => {

  //first we get user from file using id.
  const [user] =
    (JSON.parse(
      await fs.readFile("./src/data/users/users.json", "utf-8")
  ) || []).filter((user) => user.id === req.user.id) || [];

  const { role } = user;
  if (role !== "admin") {
    return next(new Error("You are not an admin", 403));
  }
  next();
})