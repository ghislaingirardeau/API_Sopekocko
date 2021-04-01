const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema ({
    userID: {type: String, require: true},
    jaime: {type: Number}
})

const likes = mongoose.model('likes', likeSchema)

module.exports = likes