// middleware for verify user is logged in or not.
import jwt from  'jsonwebtoken'


export const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Error("You are not logged in", 401));
  }
  // now we verify token.
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return next(new Error("You are not logged in", 401));
  }
  req.user = decoded;
  next();
}