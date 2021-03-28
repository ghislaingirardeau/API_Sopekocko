const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.body.token /* A DETERMNIER OU RECUP LE TOKEN: header ou requete */
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_CONNEXION_SOPEKOCKO")
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId != userId) {
            res.status(404).json({error :"Cet Id n'existe pas !"})
        }
        else {
            console.log("ca marche")
            next()
        }
    }
    catch (error) {
        res.status(401).json({error :'Requête non authentifié !'})
    }
}

module.exports = auth