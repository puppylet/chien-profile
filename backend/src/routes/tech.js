const express = require('express')
const router  = express.Router()

const Tech = require('../controllers/tech')

router.post('/', Tech.create)
router.put('/:id', Tech.update)
router.put('/', Tech.update)
router.get('/', Tech.findAll)
router.get('/:id', Tech.findOne)
router.delete('/:id', Tech.remove)
router.delete('/', Tech.remove)

module.exports = router
