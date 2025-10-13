import express from 'express';
import cookieParse from 'cookie-parse'

export const app = express();

app.use(express.json({
  limit : '50mb'
}))

app.use(cookieParse())

app.use(express.urlencoded({ extended: true }));

// here we configure routes.

// global middleware for error handling.
app.use((err, req, res, next) => {
  // console.log(err.stack)
  const error = err?.message || "Something went wrong!";
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error,
    statusCode: statusCode,
  });
});