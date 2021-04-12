const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const mongooseHidden = require('mongoose-hidden')()

const utilisateurSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true, hide: false}, 
    password: {type: String, require: true}
})

utilisateurSchema.plugin(uniqueValidator)
utilisateurSchema.plugin(mongooseHidden)

module.exports = mongoose.model('utilisateur', utilisateurSchema)