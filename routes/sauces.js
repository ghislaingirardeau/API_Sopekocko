const express = require('express')
const sauces = require('../controllers/sauces')
const router = express.Router()

router.post('/sauces', sauces.createSauce)
/* router.put('/sauces/:id', sauces)
router.delete('/sauces/:id', sauces)
router.get('/sauces/:id', sauces) */
router.get('/sauces', sauces.listesauces)


module.exports = router