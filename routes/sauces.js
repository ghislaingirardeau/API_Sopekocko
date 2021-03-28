const express = require('express')
const sauces = require('../controllers/sauces')
const router = express.Router()

router.post('api/sauces', sauces)
router.put('api/sauces/:id', sauces)
router.delete('api/sauces/:id', sauces)
router.get('api/sauces/:id', sauces)
router.get('api/sauces', sauces)


module.exports = router