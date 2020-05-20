const express = require('express')
const router  = express.Router()

const Hiring = require('../controllers/hiring')

router.post('/create', Hiring.create)
router.get('/', Hiring.findAll)
router.get('/:id', Hiring.findOne)
router.delete('/:id', Hiring.remove)
router.delete('/', Hiring.remove)

module.exports = router
