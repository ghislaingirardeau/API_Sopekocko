const express = require('express');
const userControle = require('../controllers/users');
const router = express.Router();

router.post('/signup', userControle.signup);
router.post('/login', userControle.login);

/* ADMIN: POUR LA GESTION DES COMPTES USERS */
router.get('/', userControle.usersAll);
router.delete('/:id', userControle.deleteUser);


module.exports = router;