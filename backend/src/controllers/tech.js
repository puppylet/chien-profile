const mongoose = require('mongoose')
const Tech = mongoose.model('Tech')
const s3Upload = require('../libs/s3Upload')

const { checkRole } = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const { auth } = req
    if (!checkRole('create-tech', auth)) return res.status(401).end()

    const body = req.body
    const { logo, ...data } = body
    const tech = new Tech(data)
    tech.save()
    .then(doc => {
      const { _id } = doc
      if (!logo) res.status(201).send({ status: true, message: 'Create tech successfully', _id })
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        const newLogo = { logo: data.Location }
        Tech.update({ _id }, newLogo)
        .then(doc2 => !doc2
          ? res.status(404).send({ error: 'Tech does not exist' })
          : res.status(200).send({ status: true, message: 'Create tech successfully', _id }))
        .catch(err => res.status(500).send({ error: err }))
      }
      const imageData = {image: logo, Key: `logos/${_id}`}
      s3Upload.uploadImage(imageData, handleUpload)
    })
    .catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {

    const { auth } = req
    if (!checkRole('list-tech', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 1000
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.name) query.name = new RegExp(req.query.techName, 'i')
    if (req.query.isActive) query.isActive = req.query.isActive
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    Tech.countDocuments(query)
    .then(total => Tech.find(query).limit(limit).skip(offset).sort(sort).select()
    .then(docs => res.status(200).send({ data: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const { auth } = req
    if (!checkRole('list-tech', auth)) return res.status(401).end()

    const _id = req.params.id

    Tech.findOne({ _id }).select('-password')
    .then(doc => !doc ? res.status(404).send({ error: 'Tech does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  update: (req, res) => {
    const { auth } = req
    if (!checkRole('write-tech', auth)) return res.status(401).end()
    const { body } = req
    const _id = req.params.id
    body.updated_at = new Date()
    if (body.logo) {
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        body.logo = data.Location
        Tech.update({ _id: { $in: _id } }, body)
        .then(doc => !doc
          ? res.status(404).send({ error: 'Tech does not exist' })
          : res.status(200).send({ status: true, message: 'Update successfully' }))
        .catch(err => res.status(500).send({ error: err }))
      }
      const imageData = {image: body.logo, Key: `logos/${_id}`}
      s3Upload.uploadImage(imageData, handleUpload)

    } else {
      Tech.update({ _id: { $in: _id } }, body)
      .then(doc => !doc
        ? res.status(404).send({ error: 'Tech does not exist' })
        : res.status(200).send({ status: true, message: 'Update successfully' }))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: err })
      })
    }
  },

  remove: (req, res) => {
    const { auth } = req
    if (!checkRole('write-tech', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    Tech.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'Tech does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  }
}
