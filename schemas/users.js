const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const mongooseHidden = require('mongoose-hidden')()

const utilisateurSchema = new mongoose.Schema({
    email: {type: Buffer, require: true, unique: true, hide: true}, 
    password: {type: String, require: true}
})

utilisateurSchema.plugin(uniqueValidator)
utilisateurSchema.plugin(mongooseHidden)

module.exports = mongoose.model('utilisateur', utilisateurSchema)