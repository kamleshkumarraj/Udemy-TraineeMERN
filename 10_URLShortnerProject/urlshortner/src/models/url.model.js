import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  urlCode : {
    type : String,
    required : true,
    unique : true,
    min : [3, "First name must be at least 3 characters long"],
    max : [50, "First name must be at most 50 characters long"],
    trim : true
  },
  longUrl : {
    type : String,
    required : true,
    min : [3, "First name must be at least 3 characters long"],
    trim : true
  },
  visited : [{
    visitedBy : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'users'
    }
  }],
  shortUrl : {
    type : String,
    required : true,
    min : [3, "First name must be at least 3 characters long"],
    max : [50, "First name must be at most 50 characters long"],
    trim : true
  },
  generatedBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'users',
    required : true
  }
})

export const Urls = mongoose.model("urls", urlSchema);