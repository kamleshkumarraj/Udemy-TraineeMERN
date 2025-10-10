import dotenv from 'dotenv'
dotenv.config({
  path : "./.env"
})
import { app } from "./app.js";
import { connectDB } from './db/index.js';

// server listening
const PORT = 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})