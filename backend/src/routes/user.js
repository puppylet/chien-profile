const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

router.post('/', User.create);
router.put('/:id', User.update);
router.put('/', User.update);
router.get('/', User.findAll);
router.get('/roles', User.getRoles);
router.get('/:id', User.findOne);
router.delete('/:id', User.remove);
router.delete('/', User.remove);

module.exports = router
