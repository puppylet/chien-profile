const express = require('express')
const router  = express.Router()

const Project = require('../controllers/project')

router.post('/', Project.create)
router.post('/:id', Project.addPhoto)
router.put('/:id', Project.update)
router.delete('/photo/:id/:index', Project.removePhoto)
router.delete('/:id', Project.remove)
router.put('/', Project.update)
router.get('/', Project.findAll)
router.get('/:id', Project.findOne)
router.delete('/', Project.remove)

module.exports = router
