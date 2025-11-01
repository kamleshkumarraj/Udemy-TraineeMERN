import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required : true,
    default : null
  },
  expiresAt : {
    type : Date,
    required : true
  },
  cartList : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "products",
    }
  ],


}, {timestamps : true})

export const Session = mongoose.model("sessions", sessionSchema);