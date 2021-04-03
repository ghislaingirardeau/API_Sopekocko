const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')


const utilisateurSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true}, 
    password: {type: String, require: true}
})

utilisateurSchema.plugin(uniqueValidator)

module.exports = mongoose.model('utilisateur', utilisateurSchema)