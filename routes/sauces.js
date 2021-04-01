const express = require('express')
const sauces = require('../controllers/sauces')
const authentification = require('../Middleware/auth')
const multer = require('../Middleware/multer')
const router = express.Router()

router.post('/sauces', authentification, multer, sauces.createSauce)

router.put('/sauces/:id', authentification, multer, sauces.updateSauce)
router.delete('/sauces/:id', authentification, sauces.deleteSauce)
router.get('/sauces/:id', authentification, sauces.findSauce)
router.get('/sauces', authentification, sauces.tableauSauces)


module.exports = router