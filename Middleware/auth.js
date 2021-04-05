const jwt = require('jsonwebtoken')

const authentification = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1] 
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_USERS}`)
        const tokenUserId = decodedToken.userId
        if (req.body.userId && req.body.userId != tokenUserId) {
            res.status(404).json({error :"Cet Id n'existe pas !"})
        }
        else {
            next()
        }
    }
    catch (error) {
        res.status(401).json({error :'Requête non authentifié !'})
    }
}

module.exports = authentification