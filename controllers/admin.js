const User = require('../schemas/users')
const sauces = require('../schemas/sauces')

/* ADMIN DE LA BASE DE DONNEE */
exports.usersAll = (req, res, next) => {
    User.find()
        .then((users) => res.status(200).json({users}))
        .catch(() => res.status(400).json({message: "pas de users" }))
}

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({message: 'suppression réussie'}))
    .catch(() => res.status(400).json({message: 'Echec suppression'}))
}

exports.deleteSauce = (req, res, next) => {
        sauces.deleteOne({_id : req.params.id})
        .then(() => res.status(200).json({message: "suppression OK"}))
        .catch(() => res.status(400).json({message: "echec supp"})) 
}

exports.saucesAll = (req, res, next) => {
    sauces.find()
        .then((sauce) => res.status(200).json({sauce}))
        .catch(() => res.status(400).json({message: "pas de sauce" }))
}
