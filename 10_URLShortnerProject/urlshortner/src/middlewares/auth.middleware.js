// middleware for verify user is logged in or not.
export const isLoggedIn = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new Error("You are not logged in", 401));
  }
  // now we verify token.
  const decoded = jwt.verify(token, SECRET_KEY);
  if (!decoded) {
    return next(new Error("You are not logged in", 401));
  }
  req.user = decoded;
  next();
}