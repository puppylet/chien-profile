const mongoose = require('mongoose')
const Testimonial = mongoose.Schema({
  name: String,
  company: String,
  position: String,
  relationship: String,
  avatar: {type: String, default: ''},
  message: String,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('Testimonial', Testimonial)
