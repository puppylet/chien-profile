const express = require('express')
const router  = express.Router()

const Profile = require('../controllers/profile.js')

router.get('/', Profile)

module.exports = router
