const express = require('express');
const router = express.Router();

const utilisateurControle = require('../controllers/users');

router.post('/signup', utilisateurControle.signup);


module.exports = router;