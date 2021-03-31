const jwt = require('jsonwebtoken');

const authentification = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; /* A DETERMNIER OU RECUP LE TOKEN: header ou requete */
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_CONNEXION_SOPEKOCKO")
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId != userId) {
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