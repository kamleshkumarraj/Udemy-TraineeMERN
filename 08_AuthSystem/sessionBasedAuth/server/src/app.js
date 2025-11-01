import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { sessionRouter } from './routes/session.routes.js';
import { userProfileRouter } from './routes/userProfile.routes.js';

export const app = express();

app.use(
  express.json({
    limit: '50mb',
  }),
);

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  }),
);

app.use(cookieParser(process.env.SECRET_KEY));

// app.use(express.urlencoded({ extended: true }));

// now we write basic route for checking server.
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to our auth system',
  });
});

// now we write code for checking health for server.
app.get('/health-check', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Everything is perfect and server running successfully...',
  });
});

// now we configure routes for handling authentication.
app.use('/api/v1/auth', authRouter);

// now we configure routes for handling session routes.
app.use('/api/v1/session', sessionRouter);

// now we configure routes for handling user profile routes.
app.use('/api/v1/profile', userProfileRouter);

// now we write code for handling unhandled rejection.
process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection:', err);
  // Application specific logging, throwing an error, or other logic here
});

// now we write code for handling uncaught exception.
process.on('uncaughtException', err => {
  console.log('Uncaught Exception:', err);
  // Application specific logging, throwing an error, or other logic here
});

// global middleware for error handling.
app.use((err, req, res, next) => {
  console.log(err.stack)
  // console.log('Hello');
  const error = err?.message || 'Something went wrong!';
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error,
    statusCode: statusCode,
  });
});
