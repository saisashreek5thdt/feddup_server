const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  ipAddress:{
    type:String,
    required:true
  },
  os:{
    type:String,
    required:true
  },
  network:{
    type:String,
    required:true
  },
  browser:{
    type:String,
    required:true
  },
  rating:{
    type: Number,
    required:true
  },
  message: {
    type: String,
    maxlength:125,
    required: true
  },
  id:{
    type: String,
    required: true
  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", UserSchema);