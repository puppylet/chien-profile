const mongoose = require('mongoose')
const Skill = mongoose.Schema({
  title: String,
  percent: Number,
  created_at: {type: Date, default: Date.now()},
  isActive: {type: Boolean, default: true},
})

module.exports = mongoose.model('Skill', Skill)
