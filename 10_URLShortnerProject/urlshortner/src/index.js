import dotenv from 'dotenv/config'
import { app } from "./app.js";
import { connectDB } from "./db/connection.js";

// first we connect db.
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