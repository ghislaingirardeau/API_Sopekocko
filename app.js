const express = require('express')
var mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const saucesRoutes = require('./routes/sauces')
const adminRoutes = require('./routes/admin')
const path = require('path')

const app = express()

mongoose.connect('mongodb+srv://'+ process.env.DB_USER +':' + process.env.DB_PASSWORD + '@cluster0.d1pzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
    { useNewUrlParser: true, 
      useUnifiedTopology: true
    })
.then(() => console.log('La connexion à la base de donnée a réussi !')) 
.catch(() => console.log('La connexion à la base de donnée a échoué !'))

/* Correction  erreur serveur (node:16280) DeprecationWarning */
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

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', usersRoute)
app.use('/api/sauces', saucesRoutes)
app.use('/api', adminRoutes)


module.exports = app

