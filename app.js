const express = require('express')
var mongoose = require('mongoose');
/* const bodyparser= require('body-parser') */

const app = express()

mongoose.connect('mongodb+srv://Sopekocko:projet6openclassroom@cluster0.d1pzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true
    })
.then(() => console.log('La connexion à la base de donnée a réussi !')) 
.catch(() => console.log('La connexion à la base de donnée a échoué !'));

/* Correction  erreur serveur (node:16280) DeprecationWarning */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/* Configuration du header */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  next();
});    

app.use(express.json())

/* const Utilisateurroute = require('./routes/users') */
const Utilisateur = require('./schemas/users')

app.post('/api/users', (req, res, next) => {
  const user = new Utilisateur({
    ...req.body
  })
  user.save()
  .then(() => res.status(200).json({message: 'Utilisateur créer'}))
  .catch(error => res.status(400).json(error))
})

app.get('/api/users', (req, res, next) => {
  Utilisateur.find()
  .then(users => res.status(200).json({users}))
  .catch(error => res.status(400).json(error))
})

module.exports = app