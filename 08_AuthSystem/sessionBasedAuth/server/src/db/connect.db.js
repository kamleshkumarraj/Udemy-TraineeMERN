import mongoose from 'mongoose';
import { MONGODB_URL } from '../constant.js';

export const connectDB = async () => {
  console.log(MONGODB_URL)
  const connect = await mongoose.connect(MONGODB_URL);
  console.log(
    `Database connected on host:${connect.connection.host} and port:${connect.connection.port}`,
  );
};
