import dotenv from 'dotenv/config'
import { app } from "./app.js";
import { connectDB } from "./db/connection.js";
import { urlHandlerRouter } from './routes/urls.routes.js';
import { asyncErrorHandler } from './errors/asyncErrorHanlder.error.js';
import { Urls } from './models/url.model.js';
import { authRouter } from './routes/auth.routes.js';
// import { Urls } from './models/url.model.js';

// now we handle route for backend.

//route for url handler.


connectDB()
.then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
  })
})
.catch((err) => {
  console.log(`We can't start server because database connection failed due to this error : ${err}`);
})

