const mongoose = require('mongoose')
const User = mongoose.model('User')
const s3Upload = require('../libs/s3Upload')

const {checkRole, createPassword} = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const { auth } = req
    if (!checkRole('create-user', auth)) return res.status(401).end()

    const body = req.body
    body.created_at = new Date()
    body.password = createPassword(body.password)
    body.birthday = new Date(body.birthday)
    const { avatar, ...data } = body
    const user = new User(data)
    user.save()
    .then(doc => {
      const { _id } = doc
      if (!body.avatar) res.status(201).send({ status: true, message: 'Create user successfully', _id })
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        const newAvatar = { avatar: data.Location }
        User.update({ _id }, newAvatar)
        .then(doc2 => !doc2
          ? res.status(404).send({ error: 'User does not exist' })
          : res.status(200).send({ status: true, message: 'Create user successfully', _id }))
        .catch(err => res.status(500).send({ error: err }))
      }
      const imageData = {image: body.avatar, Key: `avatars/${_id}`}
      s3Upload.uploadImage(imageData, handleUpload)
    })
    .catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {

    const { auth } = req
    if (!checkRole('list-user', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.userName) query.userName = new RegExp(req.query.userName, 'i')
    if (req.query.fullName) query.fullName = new RegExp(req.query.fullName, 'i')
    if (req.query.email) query.email = new RegExp(req.query.email, 'i')
    if (req.query.phone) query.phone = new RegExp(req.query.phone, 'i')
    if (req.query.sex) query.sex = req.query.sex
    if (req.query.isActive) query.isActive = req.query.isActive
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    User.count(query)
    .then(total => User.find(query).limit(limit).skip(offset).sort(sort).select('-password')
    .then(docs => res.status(200).send({ data: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const { auth } = req
    if (!checkRole('list-user', auth)) return res.status(401).end()

    const _id = req.params.id

    User.findOne({ _id }).select('-password')
    .then(doc => !doc ? res.status(404).send({ error: 'User does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  update: (req, res) => {
    const { auth } = req
    if (!checkRole('write-user', auth)) return res.status(401).end()
    const { credit, cpUser, vipTime, userName, email, ...body } = req.body
    if (body.password) body.password = createPassword(body.password)
    const _id = req.params.id
    body.updated_at = new Date()

    if (body.avatar) {
      const handleUpload = (err, data) => {
        if (err) res.status(500).send({ error: err })
        body.avatar = data.Location
        User.update({ _id: { $in: _id } }, body)
        .then(doc => !doc
          ? res.status(404).send({ error: 'User does not exist' })
          : res.status(200).send({ status: true, message: 'Update successfully' }))
        .catch(err => res.status(500).send({ error: err }))
      }
      const imageData = {image: body.avatar, Key: `avatars/${_id}`}
      s3Upload.uploadImage(imageData, handleUpload)
    } else {
      User.update({ _id: { $in: _id } }, body)
      .then(doc => !doc
        ? res.status(404).send({ error: 'User does not exist' })
        : res.status(200).send({ status: true, message: 'Update successfully' }))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: err })
      })
    }


  },

  remove: (req, res) => {
    const { auth } = req
    if (!checkRole('write-user', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    User.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'User does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  getRoles: (req, res) => {
    const { auth } = req
    if (!checkRole('manage-group', auth)) return res.status(401).end()
    res.status(200).send(roles)
  }
}
