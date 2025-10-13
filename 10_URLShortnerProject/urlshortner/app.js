import express from 'express';
import cookieParse from 'cookie-parse'

export const app = express();

app.use(express.json({
  limit : '50mb'
}))

app.use(cookieParse())

app.use(express.urlencoded({ extended: true }));

// here we configure routes.

// now we write code for handling unhandled rejection.
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  // Application specific logging, throwing an error, or other logic here
});

// now we write code for handling uncaught exception.
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
  // Application specific logging, throwing an error, or other logic here
});

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