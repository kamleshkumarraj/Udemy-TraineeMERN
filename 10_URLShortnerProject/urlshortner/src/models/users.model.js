import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usersSchema = new mongoose.Schema({
  firstName : {
    type : String,
    required : true,
    min : [3, "First name must be at least 3 characters long"],
    max : [50, "First name must be at most 50 characters long"],
    trim : true

  },
  lastName : {
    type : String,
    required : true,
    min : [3, "First name must be at least 3 characters long"],
    max : [50, "First name must be at most 50 characters long"],
    trim : true
  },
  username : {
    type : String,
    required : true,
    unique : true,
    min : [3, "First name must be at least 3 characters long"],
    max : [50, "First name must be at most 50 characters long"],
    trim : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    trim : true,
    pattern : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    lowercase : true
  },
  password : {
    type : String,
    required : true
  },
  resetPasswordToken : String,
  resetPasswordExpire : Date,

  emailVerifiedToken : String,
  emailVerifiedExpire : Date,

  role : {
    type : String,
    enum : ["user", "admin"],
    default : "user"
  },

  isEmailVerified : {
    type : Boolean,
    default : false
  }

}, {timestamps : true})

// attach middleware for hashing password before save it.
usersSchema.pre("save", async function(next) {
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

// code for attach method for checking password.
usersSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

// method for generating login token.
usersSchema.methods.getJwtToken = function() {
  return jwt.sign({_id : this._id}, process.env.JWT_SECRET, {
    expiresIn : process.env.JWT_EXPIRE
  })
}

// method for generating token for reset password.
usersSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 5 * 60 * 1000;
  return resetToken;
}

// method for generating token for email verification.
usersSchema.methods.getEmailVerificationToken = function() {
  const emailVerificationToken = crypto.randomBytes(20).toString("hex");
  this.emailVerifiedToken = crypto.createHash("sha256").update(emailVerificationToken).digest("hex");
  this.emailVerifiedExpire = Date.now() + 5 * 60 * 1000;
  return emailVerificationToken;
}


export const Users = mongoose.model("users", usersSchema);