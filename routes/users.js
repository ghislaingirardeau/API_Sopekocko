const express = require('express');
const usercontrole = require('../controllers/users');
const router = express.Router();

router.post('/signup', usercontrole.signup);


module.exports = router;