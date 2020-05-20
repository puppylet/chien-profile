const mongoose = require('mongoose')
const Hiring = mongoose.model('Hiring')

const { checkRole } = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const body = req.body
    const { logo, ...data } = body
    const hiring = new Hiring(data)
    hiring.save()
    .then(doc => {res.status(201).send({ status: true})})
    .catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {

    const { auth } = req
    if (!checkRole('list-hiring', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 1000
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.name) query.name = new RegExp(req.query.hiringName, 'i')
    if (req.query.isActive) query.isActive = req.query.isActive
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    Hiring.count(query)
    .then(total => Hiring.find(query).limit(limit).skip(offset).sort(sort).select()
    .then(docs => res.status(200).send({ data: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const { auth } = req
    if (!checkRole('list-hiring', auth)) return res.status(401).end()

    const _id = req.params.id

    Hiring.findOne({ _id }).select('-password')
    .then(doc => !doc ? res.status(404).send({ error: 'Hiring does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  remove: (req, res) => {
    const { auth } = req
    if (!checkRole('write-hiring', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    Hiring.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'Hiring does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  }
}
