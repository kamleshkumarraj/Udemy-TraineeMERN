import express from 'express';
import { authRouter } from './routes/auth.routes.js';
import { bookHandleByAdminRoute } from './routes/admin/books.routes.js';
import { bookHandleByUserRoute } from './routes/users/books.routes.js';

// server creation and server middleware configuration setup.
export const app = express();

// middleware
app.use(express.json()); // built-in middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // built-in middleware to parse URL-encoded request bodies


// now we define routes for our project.
app.route("/").get((req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Book Store API",
  });
})

//now we configure our routes for user authentication.
app.route("/api/v1/auth", authRouter)

// now we define routing for handling books by admin.
app.route("/api/v1/admin/books", bookHandleByAdminRoute)

// now we write routes fr handling book by users.
app.route('/api/v1/users/books', bookHandleByUserRoute)


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