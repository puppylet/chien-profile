const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const { checkRole } = require('../libs/auth')
module.exports = {
  create: function(req, res) {
    const { auth } = req
    if (!checkRole('create-article', auth)) return res.status(401).end()

    const body = req.body

    const article = new Article(body)

    article.created_at = new Date()
    article.creatorID = auth.id
    article.save()
    .then(doc => res.status(201).send(doc))
    .catch(err => res.status(500).send(err))
  },

  findAll: function(req, res) {
    const { auth } = req
    if (!checkRole('list-article', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.text) query.userName = new RegExp(req.query.text, 'i')
    if (req.query.title) query.title = new RegExp(req.query.title, 'i')
    if (req.query.description) query.description = new RegExp(req.query.description, 'i')
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    Article.count(query)
    .then(total => Article.find(query).limit(limit).skip(offset).sort(sort).select('-data')
    .then(docs => res.status(200).send({ result: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => {
      console.log(err)
      res.status(500).send(err)
    })
  },

  findOne: function(req, res) {
    const { auth } = req
    if (!checkRole('list-article', auth)) return res.status(401).end()

    const _id = req.params.id

    Article.findOne({ _id })
    .then(doc => !doc ? res.status(404).send({ error: 'Article does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  lite: (req, res) => {
    const { auth } = req
    if (!checkRole('list-article', auth)) return res.status(401).end()

    const _id = req.params.id

    Article.findOne({ _id }).select('title description _id')
    .then(doc => !doc ? res.status(404).send({ error: 'Article does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  update: function(req, res) {

    const { auth } = req
    if (!checkRole('update-article', auth)) return res.status(401).end()
    const _id = req.params.id
    let body = req.body

    body.updated_at = new Date()

    Article.update({ _id: { $in: _id } }, body)
    .then(doc => !doc
      ? res.status(404).send({ error: 'Article does not exist' })
      : res.status(200).send({ status: true, message: 'Updated successfully', content: doc }))
    .catch(err => res.status(500).send({ error: err }))
  },

  remove: function(req, res) {
    const { auth } = req
    if (!checkRole('remove-article', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    let body = req.body
    body.updated_at = new Date()

    Article.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'Article does not exist' }) : res.status(200).send({
      status: true,
      message: 'Deleted successfully'
    }))
    .catch(err => res.status(500).send({ error: err }))
  }
}
