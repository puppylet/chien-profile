const mongoose = require('mongoose')
const Project = mongoose.Schema({
  name: String,
  client: [String],
  logo: String,
  description: String,
  website: String,
  photos: [String],
  tech: [String],
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true}
})

module.exports = mongoose.model('Project', Project)
