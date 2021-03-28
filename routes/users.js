const express = require('express');
const usercontrole = require('../controllers/users');
const router = express.Router();

router.post('/signup', usercontrole.signup);
router.post('/login', usercontrole.login);

/* APERCU BASE DE DONNEES USERS: PAS DANS LE PROJET */
router.get('/', usercontrole.users)

module.exports = router;