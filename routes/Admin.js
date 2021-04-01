const express = require('express')
const userAdmin = require('../controllers/admin')
const router = express.Router()

/* ADMIN: POUR LA GESTION DES COMPTES USERS */
/* AJOUTER UNE AUTHENTIFICATION */

router.get(`${process.env.ADMIN_ALLUSERS}`, userAdmin.usersAll);
router.delete(`${process.env.ADMIN_DELETEUSER}`, userAdmin.deleteUser);

router.get(`${process.env.ADMIN_SAUCE}`, userAdmin.saucesAll)
router.delete(`${process.env.ADMIN_SAUCE}`, userAdmin.deleteAllsauce)

module.exports = router;