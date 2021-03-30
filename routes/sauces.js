const express = require('express')
const sauces = require('../controllers/sauces')
const authentification = require('../Middleware/auth')
const multer = require('../Middleware/multer')
const router = express.Router()

router.post('/sauces', authentification, multer, sauces.createSauce)
/* router.put('/sauces/:id', sauces)
router.delete('/sauces/:id', sauces)
router.get('/sauces/:id', sauces) */
router.get('/sauces', authentification, sauces.listeSauces)

/* MODE DEVELOPPEMENT */
router.delete('/sauces', sauces.deletesauce)


module.exports = router