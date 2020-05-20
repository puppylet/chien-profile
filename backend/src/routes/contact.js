const express = require('express')
const router  = express.Router()

const Contact = require('../controllers/contact')

router.post('/', Contact.create)
router.get('/', Contact.findAll)
router.get('/:id', Contact.findOne)
router.delete('/:id', Contact.remove)
router.delete('/', Contact.remove)

module.exports = router
