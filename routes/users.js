const express = require('express');
const userControle = require('../controllers/users');
const auth = require('../Middleware/auth');
const router = express.Router();

router.post('/signup', userControle.signup);
router.post('/login', userControle.login);

/* APERCU BASE DE DONNEES USERS: PAS DANS LE PROJET */
router.get('/', auth)

module.exports = router;