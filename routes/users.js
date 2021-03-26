const express = require('express')
var router = express.Router()

var utilisateurControle = require('../controllers/users')

router.post('/api/users', utilisateurControle.signup)


module.exports = router