const mongoose = require('mongoose')
const Client = mongoose.Schema({
  logo: String,
  website: String,
  name: String,
  description: String,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('Client', Client)
