
import { ErrorHandler } from "../../errors/apiError.error.js";
import { asyncErrorHandler } from "../../errors/asyncErrorHanlder.error.js";
import { Users } from "../../models/users.model.js";
import { loginWithJWT } from "../../utils/loginUsingJwt.utils.js";

// controller for register student or faculty.
export const register = asyncErrorHandler(async (req, res, next) => {

  const {firstName, lastName, email, username, password, role} = req.body;


  // first we check if user is already registered or not.
  const existingUser = await Users.findOne({$or: [{ email }, { username }] });

  if (existingUser) return next(new ErrorHandler("User already registered !", 400));

   // now we create user.
  await Users.create({
    firstName,
    lastName,
    email,
    username,
    password,
    role : role || "user"

  })

  res.status(200).json({
    success: true,
    message: `${role} registered successfully !`,
  });

});

// now we write controller for login student.
export const login = asyncErrorHandler(async (req, res, next) => {
  const { username, email, password, role="user" } = req.body;
  // first we check student is registered or not.
  const user = await Users.findOne({
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

// now we write controller for updating the profile.

export const directLogin = asyncErrorHandler(async (req, res, next) => {
  const user = await Users.findById(req.user,{role : 1, _id : 0}).lean();
  res.status(200).json({
    success: true,
    message: "User logged in successfully.",
    data: user,
  });
})