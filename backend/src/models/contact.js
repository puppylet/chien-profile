const mongoose = require('mongoose')
const Contact = mongoose.Schema({
  title: String,
  name: String,
  email: String,
  subject: String,
  message: String,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true},
})

module.exports = mongoose.model('Contact', Contact)
