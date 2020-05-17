const express = require('express');
const router = express.Router();

const Auth = require('../controllers/auth');

router.post('/login', Auth.login);
router.post('/sign-up', Auth.signUp);
router.get('/me', Auth.me);

module.exports = router;
