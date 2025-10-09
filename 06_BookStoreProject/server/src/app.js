import express from 'express';

// server creation and server middleware configuration setup.
export const app = express();

// middleware
app.use(express.json()); // built-in middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // built-in middleware to parse URL-encoded request bodies

// now we write code for unhandled rejections and uncaught exceptions
// unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
});

// uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
  // Application specific logging, throwing an error, or other logic here
});



// global error handling middleware
app.use((err, req, res, next) => {
  const error = err?.message || "Something went wrong!";
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error,
    statusCode: statusCode,
  });
});