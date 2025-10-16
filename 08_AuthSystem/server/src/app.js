import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const app = express();

// now we write middleware that required for server setup.
app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// middleware to parse body data.
app.use(
  express.json({
    limit: '50mb',
  }),
);

// middleware for parsing cookies.
app.use(cookieParser());

// middleware for handling url.
app.use(
  express.urlencoded({
    extended: true,
    limit: '5mb',
  }),
);

// now we handle uncaught errors.
process.on('uncaughtException', err => {
  console.log(err);
  process.exit(1);
});

// now we handle unhandled rejection.
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

// middleware for error handling.
app.use((err, req, res, next) => {
  const message = err.message || 'Interval server error !';
  const statusCode = err.statusCode || 500;
  res.status(statusCode || 500).json({
    success: false,
    message: message,
  });
});
