const mongoose = require('mongoose')
const User     = mongoose.Schema({
  userName: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  fullName: String,
  birthday: Date,
  address: String,
  phoneNumber: String,
  sex: Number,
  avatar: {type: String, default: ''},
  lastLogin: Date,
  description: String,
  activeCode: String,
  forgotPasswordCode: String,
  forgetPasswordExpired: Date,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: false},
  roles: Array,
  cpUser: Boolean,
  isAdmin: Boolean,
})

module.exports = mongoose.model('User', User)
