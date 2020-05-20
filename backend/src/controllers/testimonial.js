const mongoose = require('mongoose')
const Testimonial = mongoose.model('Testimonial')
const uuid = require('uuid')
const AWS = require('aws-sdk')
const s3Config = require('../../../config/s3')
const sharp = require('sharp')
const s3 = new AWS.S3(options = s3Config)

const {checkRole} = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const body = req.body
    const {avatar, ...data} = body
    const testimonial = new Testimonial(data)
    testimonial.save()
    .then(doc => {
      const {_id} = doc
      if (!body.avatar) res.status(201).send({status: true, message: 'Create testimonial successfully', _id})
      const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      const type = avatar.split(';')[0].split('/')[1]
      sharp(base64Data)
      .resize(400, 400)
      .jpeg({quality: 90, force: false})
      .png({compressionLevel: 9, force: false})
      .toBuffer()
      .then(function (outputBuffer) {
        const params = {
          Bucket: s3Config.fileBucket,
          Key: `avatars/${_id}.${type}`,
          UploadId: uuid.v1(),
          Body: outputBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }
        s3.upload(params, (err, data) => {
          if (err) res.status(500).send({error: err})
          const newAvatar = {avatar: data.Location}
          Testimonial.update({_id}, newAvatar)
          .then(doc2 => !doc2
            ? res.status(404).send({error: 'Testimonial does not exist'})
            : res.status(200).send({status: true, message: 'Create testimonial successfully', _id}))
          .catch(err => res.status(500).send({error: err}))
        })
      })
    })
    .catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const offset = (page - 1) * limit
    const query = {}
    let sort = {_id: -1}
    Testimonial.count(query)
    .then(total => Testimonial.find(query).limit(limit).skip(offset).sort(sort).select()
    .then(docs => res.status(200).send({data: docs, total}))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const {auth} = req
    if (!checkRole('list-testimonial', auth)) return res.status(401).end()
    const _id = req.params.id
    Testimonial.findOne({_id}).select()
    .then(doc => !doc ? res.status(404).send({error: 'Testimonial does not exist'}) : res.status(200).send(doc))
    .catch(err => res.status(500).send({error: err}))
  },

  remove: (req, res) => {
    const {auth} = req
    if (!checkRole('write-testimonial', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    Testimonial.remove({_id: {$in: _id}})
    .then(doc => !doc ? res.status(404).send({error: 'Testimonial does not exist'}) : res.status(200).send(doc))
    .catch(err => res.status(500).send({error: err}))
  }
}
