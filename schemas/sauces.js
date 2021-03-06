const mongoose = require("mongoose")

const saucesSchema = new mongoose.Schema({

    userId: {type: String, require: true},
    name: {type: String, require: true},
    manufacturer: {type: String, require: true},
    description: {type: String, require: true},
    mainPepper: {type: String, require: true},
    imageUrl: {type: String, require: true},
    heat: {type: Number, require: true},
    likes: {type: Number},
    dislikes: {type: Number},
    usersLiked: [{type: String}],
    usersDisliked: [{type: String}]
})


module.exports = mongoose.model('sauces', saucesSchema)

