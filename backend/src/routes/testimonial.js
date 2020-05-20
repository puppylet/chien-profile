const express = require('express')
const router  = express.Router()

const Testimonial = require('../controllers/testimonial')

router.post('/create', Testimonial.create)
router.get('/', Testimonial.findAll)
router.get('/:id', Testimonial.findOne)
router.delete('/:id', Testimonial.remove)
router.delete('/', Testimonial.remove)

module.exports = router
