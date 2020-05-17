const express = require('express')
const router  = express.Router()

const Article = require('../controllers/article')

router.post('/', Article.create)
router.put('/:id', Article.update)
router.put('/', Article.update)
router.get('/', Article.findAll)
router.get('/:id', Article.findOne)
router.get('/lite/:id', Article.lite)
router.delete('/:id', Article.remove)
router.delete('/', Article.remove)

module.exports = router
