const mongoose = require('mongoose')
const Experience = mongoose.Schema({
  name: String,
  position: String,
  description: String,
  logo: String,
  tech: [String],
  from: Date,
  to: Date,
  isCurrent: Boolean,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('Experience', Experience)
