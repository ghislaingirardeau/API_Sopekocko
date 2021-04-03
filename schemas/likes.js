const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema ({
    userId: {type: String /* , require: true */},
    jaime: {type: Number, require: true}
})

const likes = mongoose.model('likes', likeSchema)

module.exports = likes

/* suppr */