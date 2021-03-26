const https = require('https')
const app = require('./app')

app.set('port', 3000)

const server = https.createServer(app)

server.listen(3000)


