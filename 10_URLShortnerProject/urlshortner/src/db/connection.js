import mongoose from "mongoose";

export const connectDB = async () => {
  const connect = await mongoose.connect(process.env.MONGO_URL);
  console.log(`Database connected on host:${connect.connection.host} and port:${connect.connection.port}`)
}