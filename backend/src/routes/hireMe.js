const express = require('express')
const router  = express.Router()

const Hiring = require('../controllers/hiring')

router.post('/', Hiring.create)

module.exports = router
