const mongoose = require('mongoose')
const Experience = mongoose.model('Experience')
const s3Upload = require('../libs/s3Upload')

const { checkRole } = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const { auth } = req
    if (!checkRole('create-experience', auth)) return res.status(401).end()

    const body = req.body
    body.created_at = new Date()
    const { logo, ...data } = body
    const experience = new Experience(data)
    experience.save()
    .then(doc => {
      const { _id } = doc
      if (!logo) res.status(201).send({ status: true, message: 'Create experience successfully', _id })
      const imageData = {image: body.logo, Key: `logos/${_id}`}
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        const newLogo = { logo: data.Location }
        Experience.update({ _id }, newLogo)
        .then(doc2 => !doc2
          ? res.status(404).send({ error: 'Experience does not exist' })
          : res.status(200).send({ status: true, message: 'Create experience successfully', _id }))
        .catch(err => res.status(500).send({ error: err }))
      }
      s3Upload.uploadImage(imageData, handleUpload)
    })
    .catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {

    const { auth } = req
    if (!checkRole('list-experience', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.name) query.name = new RegExp(req.query.experienceName, 'i')
    if (req.query.isActive) query.isActive = req.query.isActive
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    Experience.countDocuments(query)
    .then(total => Experience.find(query).limit(limit).skip(offset).sort(sort).select('-password')
    .then(docs => res.status(200).send({ data: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const { auth } = req
    if (!checkRole('list-experience', auth)) return res.status(401).end()

    const _id = req.params.id

    Experience.findOne({ _id }).select('-password')
    .then(doc => !doc ? res.status(404).send({ error: 'Experience does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  update: (req, res) => {
    const { auth } = req
    if (!checkRole('write-experience', auth)) return res.status(401).end()
    const { credit, cpExperience, vipTime, experienceName, email, ...body } = req.body
    if (body.password) body.password = createPassword(body.password)
    const _id = req.params.id
    body.updated_at = new Date()

    if (body.logo) {
      const imageData = {image: body.logo, Key: `logos/${_id}`}
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        body.logo = data.Location
        Experience.update({ _id: { $in: _id } }, body)
        .then(doc => !doc
          ? res.status(404).send({ error: 'Experience does not exist' })
          : res.status(200).send({ status: true, message: 'Update successfully' }))
        .catch(err => res.status(500).send({ error: err }))
      }
      s3Upload.uploadImage(imageData, handleUpload)
    } else {
      Experience.update({ _id: { $in: _id } }, body)
      .then(doc => !doc
        ? res.status(404).send({ error: 'Experience does not exist' })
        : res.status(200).send({ status: true, message: 'Update successfully' }))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: err })
      })
    }
  },
  remove: (req, res) => {
    const { auth } = req
    if (!checkRole('write-experience', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    Experience.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'Experience does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  }
}
