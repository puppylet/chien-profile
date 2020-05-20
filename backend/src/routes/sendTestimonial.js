const express = require('express')
const router  = express.Router()

const Testimonial = require('../controllers/testimonial')

router.post('/', Testimonial.create)

module.exports = router
