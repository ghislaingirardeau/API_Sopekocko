const express = require('express');
const userControle = require('../controllers/users');
const router = express.Router();

router.post('/signup', userControle.signup);
router.post('/login', userControle.login);


module.exports = router;