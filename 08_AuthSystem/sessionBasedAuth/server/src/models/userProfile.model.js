import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
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
    min : [3, "Last name must be at least 3 characters long"],
    max : [50, "Last name must be at most 50 characters long"],
    trim : true
  },
  address : {
    type : String,
    required : true,
    min : [3, "Address must be at least 3 characters long"],
    max : [50, "Address must be at most 50 characters long"],
    trim : true
  },
  phone : {
    type : String,
    required : true,
    min : [10, "Phone number must be at least 10 characters long"],
    max : [10, "Phone number must be at most 10 characters long"],
    trim : true
  },
  bio : {
    type : String,
    required : true,
    min : [10, "Bio must be at least 3 characters long"],
    max : [1000, "Bio must be at most 50 characters long"],
    trim : true
  },

})

export const userProfile = mongoose.model('UserProfile', userProfileSchema);