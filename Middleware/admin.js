const jwt = require('jsonwebtoken')

const authAdmin =(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_USERS}`,)
        const userId = decodedToken.userId
        if (req.body.userId && req.body.userId != userId) {
            res.status(404).json({error :"Cet Id n'existe pas !"})
        }
        if (userId === `${process.env.ADMIN_ID}`) {   /* TEST AJOUT DE && req.body.userId dans la condition */
            next()
        }
        else {
            res.status(404).json({error :"Utilisateur non administrateur"})
        }
    }
    catch {
        res.status(400).json({message: "Erreur d'authentification"})
    }
}

module.exports = authAdmin