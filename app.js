const express = require('express')
var mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const saucesRoutes = require('./routes/sauces')
const path = require('path')

const app = express()

mongoose.connect('mongodb+srv://'+ process.env.DB_USER_LOG +':' + process.env.DB_USER_PASSWORD + '@cluster0.d1pzv.mongodb.net/sopekockoDatabase?retryWrites=true&w=majority', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true
    })
.then(() => console.log('La connexion à la base de donnée a réussi !')) 
.catch(() => console.log('La connexion à la base de donnée a échoué !'))

/* Correction  erreur serveur (node:16280) DeprecationWarning  */
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

/* Configuration du header */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  next()
})    

app.get('/', (req, res) => res.send('Working!!!'));
app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use('/api/auth', usersRoute)
app.use('/api/sauces', saucesRoutes)

module.exports = app

