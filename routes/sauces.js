const express = require('express')
const sauces = require('../controllers/sauces')
const authentification = require('../Middleware/auth')
const multer = require('../Middleware/multer')
const router = express.Router()

router.get('/', authentification, sauces.tableauSauces)
router.post('/', authentification, multer, sauces.createSauce)

router.get('/:id',  authentification, sauces.findSauce)
router.put('/:id', authentification, multer, sauces.updateSauce)
router.delete('/:id', authentification, sauces.deleteSauce)

router.post('/:id/like', authentification, sauces.modifyLikes)

module.exports = router