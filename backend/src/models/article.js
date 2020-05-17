const mongoose = require('mongoose')
const Article  = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  data: {type: Object , required: true},
  creatorID: {type: String, required: true},
  created_at: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Article', Article)