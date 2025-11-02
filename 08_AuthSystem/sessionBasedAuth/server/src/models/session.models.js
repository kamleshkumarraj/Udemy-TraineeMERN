import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    default : null
  },
  expiresAt : {
    type : Date,
    required : true
  },
  cartList : [
    {
      productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
      },
      quantity : {
        type : Number,
        default : 1
      },
      availabilityStatus : {
        type : String,
        default : true
      }
    }
  ],


}, {timestamps : true})

export const Session = mongoose.model("sessions", sessionSchema);