const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');


var utilisateurSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true}, 
    password: {type: String, require: true}
})

utilisateurSchema.plugin(uniqueValidator)

var utilisateur = mongoose.model('utilisateur', utilisateurSchema)

module.exports = utilisateur