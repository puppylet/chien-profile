const mongoose = require('mongoose')
const Testimonial = mongoose.Schema({
  fullName: String,
  company: String,
  position: String,
  email: {type: String, required: true, unique: true},
  address: String,
  phoneNumber: String,
  avatar: {type: String, default: ''},
  testimonial: String,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: false}
})

module.exports = mongoose.model('Testimonial', Testimonial)
