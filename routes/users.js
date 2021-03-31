const express = require('express');
const userControle = require('../controllers/users');
const router = express.Router();

router.post('/signup', userControle.signup);
router.post('/login', userControle.login);

/* ADMIN: POUR LA GESTION DES COMPTES USERS */
router.get('/admin', userControle.usersAll);
router.delete('/admin/:id', userControle.deleteUser);

module.exports = router;