import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const otpSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true
  },
  otp : {
    type : String,
    required : true,
    max : [6, "OTP must be at most 6 characters long"],
    min : [6, "OTP must be at least 6 characters long"]
  },
}, {timestamps : true});

otpSchema.pre("save" , async function(next){
  if(!this.isModified("otp")) {
    next();
  }
  this.otp = await bcrypt.hash(this.otp, 10);
})

otpSchema.methods.compareOtp = async function(enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
}

export const Otp = mongoose.model('otp', otpSchema);