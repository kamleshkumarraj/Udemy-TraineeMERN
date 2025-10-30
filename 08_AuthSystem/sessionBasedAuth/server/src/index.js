import dotenv from 'dotenv';
dotenv.config({
  path : './.env'
})

import { app } from './app.js';
import { PORT } from './constant.js';
import { connectDB } from './db/connect.db.js';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(
      `We can't start server because database connection failed due to this error : ${err}`,
    );
  });
