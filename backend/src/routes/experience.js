const express = require('express')
const router  = express.Router()

const Experience = require('../controllers/experience')

router.post('/', Experience.create)
router.put('/:id', Experience.update)
router.put('/', Experience.update)
router.get('/', Experience.findAll)
router.get('/:id', Experience.findOne)
router.delete('/:id', Experience.remove)
router.delete('/', Experience.remove)

module.exports = router
