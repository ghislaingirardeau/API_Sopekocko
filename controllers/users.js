const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const salt = 10;

const User = require('../schemas/users');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, salt)
    .then(hash => {
        const utilisateur = new User ({ 
            email: req.body.email,
            password: hash
        })
        console.log(utilisateur)
        utilisateur.save()
        .then(() => status(201).json({message: 'Un nouvel utilisateur a été enrgistré'}))
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
                token: jwt.sign({
                    userId: user._id 
                }, 'BIENVENUE A SOPEKOCKO',
                { expriresIn: '3h'}
                )
            })
            console.log(valid)
            .catch((error) => res.status(401).json(error))    
        })
        console.log(user)
        .catch((error) => res.status(401).json(error))   
    })
};

