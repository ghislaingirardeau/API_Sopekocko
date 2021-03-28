const mongoose = require("mongoose");

const saucesSchema = new mongoose.Schema({
    
    userId: {type: string, require: true},
    name: {type: string, require: true},
    manufacter: {type: string, require: true},
    description: {type: string, require: true},
    mainPepper: {type: string, require: true},
    imageUrl: {type: string, require: true},
    heat: {type: number, require: true},
    likes: {type: number, require: true},
    dislikes: {type: number, require: true},
    usersLiked: [{type: string, require: true}],
    usersDisliked: [{type: string, require: true}]
})


module.exports = mongoose.model('sauces', saucesSchema)