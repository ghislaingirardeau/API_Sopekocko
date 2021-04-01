const express = require('express')
const likes = require('../controllers/likes')
const router = express.Router()

router.post('/sauces/:id/like', likes.modifyLikes)

module.exports = router
