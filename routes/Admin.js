const express = require('express')
const userAdmin = require('../controllers/admin')
const authAdmin = require ('../Middleware/admin')
const router = express.Router()

/* ADMIN: POUR LA GESTION DES COMPTES USERS */

router.get(`${process.env.ADMIN_ALLUSERS}`, authAdmin, userAdmin.usersAll);
router.delete(`${process.env.ADMIN_DELETEUSER}`, authAdmin, userAdmin.deleteUser);

router.get(`${process.env.ADMIN_SAUCE}`, authAdmin, userAdmin.saucesAll)
router.delete(`${process.env.ADMIN_SAUCE}`, authAdmin, userAdmin.deleteSauce)

module.exports = router;