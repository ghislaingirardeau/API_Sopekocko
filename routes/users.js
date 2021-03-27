const express = require('express');
const usercontrole = require('../controllers/users');
const router = express.Router();

router.post('/signup', usercontrole.signup);
router.post('/login', usercontrole.login);


module.exports = router;