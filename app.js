const express = require('express')
var mongoose = require('mongoose');

const app = express()

mongoose.connect('mongodb+srv://Sopekocko:projet6openclassroom@cluster0.d1pzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true})
    .then(() => console.log('La connexion à la base de donnée a réussi !')) 
    .catch(() => console.log('La connexion à la base de donnée a échoué !'));

module.exports = app


