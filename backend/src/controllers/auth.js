const jwt = require('jsonwebtoken')
const { createPassword, comparePassword } = require('../libs/auth')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Auth = {
  me: (req, res) => {
    const _id = req.auth.id
    User.findOne({ _id }).select('-password')
    .then(data => res.status(200).send({ success: true, data }))
    .catch(error => res.status(500).send({ success: false, error }))
  },
  signUp: (req, res) => {
    const body = req.body
    User.findOne({
      $or: [
        { userName: body.userName.toLowerCase() },
        { email: body.email.toLowerCase() }
      ]
    }).then(doc => {
      if (!doc) {
        const user = new User(body)
        user.password = createPassword(body.password)
        user.loginType = 'local'
        user.userName = user.userName.toLowerCase()
        user.email = user.email.toLowerCase()
        user.save()
        .then(data => res.status(201).send({ success: true, data }))
        .catch(err => res.status(500).send({ success: false, err }))
      } else return res.status(200).send({ success: false })
    })
  },
  login: (req, res) => {
    const body = req.body
    User.findOne({
      $or: [
        { userName: body.userName.toLowerCase() },
        { email: body.userName.toLowerCase() }
      ]
    }).then(doc => {
      if (!doc || !comparePassword(body.password, doc.password)) return res.status(200).send({
        success: false,
        error: 1
      })
      if (!doc.isActive) return res.status(200).send({ success: false, error: 2 })
      const tokenData = { id: doc._id, exp: Date.now() + 86400 * 7 }
      if (doc.isAdmin) tokenData.isAdmin = doc.isAdmin
      if (doc.roles) tokenData.roles = doc.roles
      if (doc.cpUser) tokenData.cpUser = doc.cpUser
      return res.status(200).send({
        success: true,
        token: jwt.sign(tokenData, process.env.SECRET_KEY)
      })
    }).catch(error => res.status(500).send({ success: false, error }))
  }
}

module.exports = Auth

