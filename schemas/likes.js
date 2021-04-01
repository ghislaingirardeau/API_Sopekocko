const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema ({
    userId: {type: String},
    jaime: {type: Number}
})

const likes = mongoose.model('likes', likeSchema)

module.exports = likes