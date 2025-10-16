import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
});

import { app } from './app.js';
import { connectDB } from './db/connect.db.js';
import { cloudinaryConfig } from './config/cloudinary.config.js';

// we write code for cloudinary configuration.
cloudinaryConfig()
  .then(() => {
    console.log('Cloudinary configured successfully.');
  })
  .catch(err => {
    console.log(`Cloudinary configuration failed due to this error : ${err}`);
  });

// now we define home route.
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running successfully !',
  });
});

// now we define route for health check.
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running successfully !',
  });
});

// now we write for connecting db.
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8001, () => {
      console.log(`Server is running on port ${process.env.PORT || 8001}`);
    });
  })
  .catch(err => {
    console.log(
      `We can't start server because database connection failed due to this error : ${err}`,
    );
  });
