const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/users');

const salt = 10;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, salt)
    .then(hash => {
        const utilisateur = new User ({ 
            email: req.body.email,
            password: hash
        })
        utilisateur.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé'}))
        .catch(() => res.status(400).json({message: "Echec enregistrement de l'utilisateur"}))
    })
    .catch(() => res.status(400).json({message: 'Echec'}));
}

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                return res.status(401).json({message: "Cet email n'est pas valide"})
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid){
                    return res.status(401).json({message: "Ce mot de passe n'est pas valide"})
                }     
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                    {userId: user._id}, "RANDOM_TOKEN_CONNEXION_SOPEKOCKO",
                    { expiresIn: '24h'})  
                })
            })
            .catch(() => res.status(500).json({message: "erreur login"}))   
        })
        .catch(() => res.status(500).json({message: "login impossible"}))   
};




