const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  ipAddress:{
    type:String,
  },
  os:{
    type:String,
  },
  network:{
    type:String,
  },
  browser:{
    type:String,
  },
  resetPasswordToken:{ type:String},
  resetPasswordExpires: {type:Date}
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", UserSchema);