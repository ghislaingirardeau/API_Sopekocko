const express = require('express');
var mongoose = require('mongoose');
const usersroute = require('./routes/users');
const saucesroutes = require('./routes/sauces')

const app = express();

mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@cluster0.d1pzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
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

app.use(express.json());

app.use('/api/auth', usersroute);
app.use('/api', saucesroutes)


module.exports = app;
