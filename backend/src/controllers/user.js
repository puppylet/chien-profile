const mongoose = require('mongoose')
const User = mongoose.model('User')
const uuid = require('uuid')
const AWS = require('aws-sdk')
const s3Config = require('../../../config/s3')
const sharp = require('sharp')
const roles = require('../../../config/roles')
const s3 = new AWS.S3(options = s3Config)

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
      const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      const type = avatar.split(';')[0].split('/')[1]
      sharp(base64Data)
      .jpeg({ quality: 90, force: false })
      .png({ compressionLevel: 9, force: false })
      .toBuffer()
      .then(function(outputBuffer) {
        const params = {
          Bucket: s3Config.bucket,
          Key: `staging/avatars/${_id}.${type}`,
          UploadId: uuid.v1(),
          Body: outputBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }
        s3.upload(params, (err, data) => {
          if (err) res.status(500).send({ error: err })
          const newAvatar = { avatar: data.Location }
          User.update({ _id }, newAvatar)
          .then(doc2 => !doc2
            ? res.status(404).send({ error: 'User does not exist' })
            : res.status(200).send({ status: true, message: 'Create user successfully', _id }))
          .catch(err => res.status(500).send({ error: err }))
        })
      })
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
      const base64Data = new Buffer(body.avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      const type = body.avatar.split(';')[0].split('/')[1]
      sharp(base64Data)
      .jpeg({ quality: 90, force: false })
      .png({ compressionLevel: 9, force: false })
      .toBuffer()
      .then(function(outputBuffer) {
        const params = {
          Bucket: s3Config.bucket,
          Key: `staging/avatars/${_id}.${type}`,
          UploadId: uuid.v1(),
          Body: outputBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }
        s3.upload(params, (err, data) => {
          if (err) res.status(500).send({ error: err })
          body.avatar = data.Location
          User.update({ _id: { $in: _id } }, body)
          .then(doc => !doc
            ? res.status(404).send({ error: 'User does not exist' })
            : res.status(200).send({ status: true, message: 'Update successfully' }))
          .catch(err => res.status(500).send({ error: err }))
        })
      })
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
