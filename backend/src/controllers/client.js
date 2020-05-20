const mongoose = require('mongoose')
const Client = mongoose.model('Client')
const s3Upload = require('../libs/s3Upload')

const { checkRole, createPassword } = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const { auth } = req
    if (!checkRole('create-client', auth)) return res.status(401).end()

    const body = req.body
    body.created_at = new Date()
    body.password = createPassword(body.password)
    body.birthday = new Date(body.birthday)
    const { logo, ...data } = body
    const client = new Client(data)
    client.save()
    .then(doc => {
      const { _id } = doc
      if (!body.logo) res.status(201).send({ status: true, message: 'Create client successfully', _id })
      const handleUpload = (err, data) =>{
        if (err) res.status(500).send({ error: err })
        const newLogo = { logo: data.Location }
        Client.update({ _id }, newLogo)
        .then(doc2 => !doc2
          ? res.status(404).send({ error: 'Client does not exist' })
          : res.status(200).send({ status: true, message: 'Create client successfully', _id }))
        .catch(err => res.status(500).send({ error: err }))
      }
      const imageData = {image: body.logo, Key: `logos/${_id}`}
      s3Upload.uploadImage(imageData, handleUpload)
    }).catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {

    const { auth } = req
    if (!checkRole('list-client', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.name) query.name = new RegExp(req.query.clientName, 'i')
    if (req.query.isActive) query.isActive = req.query.isActive
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    Client.count(query)
    .then(total => Client.find(query).limit(limit).skip(offset).sort(sort).select('-password')
    .then(docs => res.status(200).send({ data: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const { auth } = req
    if (!checkRole('list-client', auth)) return res.status(401).end()

    const _id = req.params.id

    Client.findOne({ _id }).select('-password')
    .then(doc => !doc ? res.status(404).send({ error: 'Client does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  update: (req, res) => {
    const { auth } = req
    if (!checkRole('write-client', auth)) return res.status(401).end()
    const { credit, cpClient, vipTime, clientName, email, ...body } = req.body
    if (body.password) body.password = createPassword(body.password)
    const _id = req.params.id
    body.updated_at = new Date()

    if (body.logo) {
      const imageData = {image: body.logo, Key: `logos/${_id}`}
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        body.logo = data.Location
        Client.update({ _id: { $in: _id } }, body)
        .then(doc => !doc
          ? res.status(404).send({ error: 'Client does not exist' })
          : res.status(200).send({ status: true, message: 'Update successfully' }))
        .catch(err => res.status(500).send({ error: err }))
      }
      s3Upload.uploadImage(imageData, handleUpload)
    } else {
      Client.update({ _id: { $in: _id } }, body)
      .then(doc => !doc
        ? res.status(404).send({ error: 'Client does not exist' })
        : res.status(200).send({ status: true, message: 'Update successfully' }))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: err })
      })
    }
  },
  remove: (req, res) => {
    const { auth } = req
    if (!checkRole('write-client', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    Client.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'Client does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  }
}
