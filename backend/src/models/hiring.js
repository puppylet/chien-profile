const mongoose = require('mongoose')
const Hiring = mongoose.Schema({
  title: String,
  name: String,
  email: String,
  phone: String,
  company: String,
  message: String,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true},
})

module.exports = mongoose.model('Hiring', Hiring)
