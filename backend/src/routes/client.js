const express = require('express')
const router  = express.Router()

const Client = require('../controllers/client')

router.post('/', Client.create)
router.put('/:id', Client.update)
router.put('/', Client.update)
router.get('/', Client.findAll)
router.get('/:id', Client.findOne)
router.delete('/:id', Client.remove)
router.delete('/', Client.remove)

module.exports = router
