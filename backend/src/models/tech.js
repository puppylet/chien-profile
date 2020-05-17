const mongoose = require('mongoose')
const Tech = mongoose.Schema({
  url: String,
  name: String,
  description: String,
  logo: String,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true},
})

module.exports = mongoose.model('Tech', Tech)
