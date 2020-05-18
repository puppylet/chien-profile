const mongoose = require('mongoose')
const uuid = require('uuid')
const Project = mongoose.model('Project')
const AWS = require('aws-sdk')
const s3Config = require('../../../config/s3')
const sharp = require('sharp')
const s3 = new AWS.S3(options = s3Config)

const { checkRole, createPassword } = require('../libs/auth')

module.exports = {
  create: (req, res) => {
    const { auth } = req
    if (!checkRole('create-project', auth)) return res.status(401).end()

    const body = req.body
    body.created_at = new Date()
    body.password = createPassword(body.password)
    body.birthday = new Date(body.birthday)
    const { logo, ...data } = body
    const project = new Project(data)
    project.save()
    .then(doc => {
      const { _id } = doc
      if (!body.logo) res.status(201).send({ status: true, message: 'Create project successfully', _id })
      const base64Data = new Buffer(logo.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      const type = logo.split(';')[0].split('/')[1]
      sharp(base64Data)
      .jpeg({ quality: 90, force: false })
      .png({ compressionLevel: 9, force: false })
      .toBuffer()
      .then(function(outputBuffer) {
        const params = {
          Bucket: s3Config.bucket,
          Key: `logos/${_id}.${type}`,
          UploadId: uuid.v1(),
          Body: outputBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }
        s3.upload(params, (err, data) => {
          if (err) res.status(500).send({ error: err })
          const newLogo = { logo: data.Location }
          Project.update({ _id }, newLogo)
          .then(doc2 => !doc2
            ? res.status(404).send({ error: 'Project does not exist' })
            : res.status(200).send({ status: true, message: 'Create project successfully', _id }))
          .catch(err => res.status(500).send({ error: err }))
        })
      })
    })
    .catch(err => res.status(500).send(err))
  },

  findAll: (req, res) => {

    const { auth } = req
    if (!checkRole('list-project', auth)) return res.status(401).end()

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 1000
    const offset = (page - 1) * limit
    const query = {}
    let sort = { _id: -1 }
    if (req.query._id) query._id = req.query.id
    if (req.query.name) query.name = new RegExp(req.query.projectName, 'i')
    if (req.query.isActive) query.isActive = req.query.isActive
    if (req.query.sortingField) sort = { [req.query.sortingField]: req.query.sortType === 'ASC' ? 1 : -1 }

    Project.count(query)
    .then(total => Project.find(query).limit(limit).skip(offset).sort(sort).select()
    .then(docs => res.status(200).send({ data: docs, total }))
    .catch(err => res.status(500).send(err)))
    .catch(err => res.status(500).send(err))
  },

  findOne: (req, res) => {
    const { auth } = req
    if (!checkRole('list-project', auth)) return res.status(401).end()

    const _id = req.params.id

    Project.findOne({ _id }).select('-password')
    .then(doc => !doc ? res.status(404).send({ error: 'Project does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  update: (req, res) => {
    const { auth } = req
    if (!checkRole('write-project', auth)) return res.status(401).end()
    const { credit, cpProject, vipTime, projectName, email, ...body } = req.body
    if (body.password) body.password = createPassword(body.password)
    const _id = req.params.id
    body.updated_at = new Date()

    if (body.logo) {
      const base64Data = new Buffer(body.logo.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      const type = body.logo.split(';')[0].split('/')[1]
      sharp(base64Data)
      .jpeg({ quality: 90, force: false })
      .png({ compressionLevel: 9, force: false })
      .toBuffer()
      .then(function(outputBuffer) {
        const params = {
          Bucket: s3Config.bucket,
          Key: `logos/${_id}.${type}`,
          UploadId: uuid.v1(),
          Body: outputBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }
        s3.upload(params, (err, data) => {
          if (err) res.status(500).send({ error: err })
          body.logo = data.Location
          Project.update({ _id: { $in: _id } }, body)
          .then(doc => !doc
            ? res.status(404).send({ error: 'Project does not exist' })
            : res.status(200).send({ status: true, message: 'Update successfully' }))
          .catch(err => res.status(500).send({ error: err }))
        })
      })
    } else {
      Project.update({ _id: { $in: _id } }, body)
      .then(doc => !doc
        ? res.status(404).send({ error: 'Project does not exist' })
        : res.status(200).send({ status: true, message: 'Update successfully' }))
      .catch(err => {
        console.log(err)
        res.status(500).send({ error: err })
      })
    }
  },

  remove: (req, res) => {
    const { auth } = req
    if (!checkRole('write-project', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id

    Project.remove({ _id: { $in: _id } })
    .then(doc => !doc ? res.status(404).send({ error: 'Project does not exist' }) : res.status(200).send(doc))
    .catch(err => res.status(500).send({ error: err }))
  },

  addPhoto: (req, res) => {
    const { auth } = req
    if (!checkRole('write-project', auth)) return res.status(401).end()

    const body = req.body
    const _id = req.body.id || req.params.id

    Project.findOne({ _id }).select('photos').then(project => {
      const { photos } = project
      body.created_at = new Date()
      const { photo } = body
      const base64Data = new Buffer(photo.replace(/^data:image\/\w+;base64,/, ''), 'base64')
      const type = photo.split(';')[0].split('/')[1]
      const name = uuid.v1()
      sharp(base64Data)
      .jpeg({ quality: 90, force: false })
      .png({ compressionLevel: 9, force: false })
      .toBuffer()
      .then(function(outputBuffer) {
        const params = {
          Bucket: s3Config.bucket,
          Key: `photos/${name}.${type}`,
          UploadId: uuid.v1(),
          Body: outputBuffer,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }
        s3.upload(params, (err, data) => {
          if (err) res.status(500).send({ error: err })
          photos.push(data.Location)
          Project.update({ _id }, { photos })
          .then(doc2 => !doc2
            ? res.status(404).send({ error: 'Project does not exist' })
            : res.status(200).send({ status: true, message: 'add photo successfully', photos }))
          .catch(err => res.status(500).send({ error: err }))
        })
      })
    }).catch(error => res.status(500).send({ success: false, error }))


  },

  removePhoto: (req, res) => {
    const { auth } = req
    if (!checkRole('write-project', auth)) return res.status(401).end()

    const _id = req.body.id || req.params.id
    const index = req.body.index || req.params.index

    Project.findOne({ _id }).select('photos')
    .then(project => {
      const { photos } = project
      photos.splice(index, 1)
      Project.update({ _id }, {photos})
      .then(doc2 => !doc2
        ? res.status(404).send({ error: 'Project does not exist' })
        : res.status(200).send({ status: true, message: 'remove photo successfully', photos }))
      .catch(err => res.status(500).send({ error: err }))
    })
    .catch(err => res.status(500).send({ error: err }))
  }
}
