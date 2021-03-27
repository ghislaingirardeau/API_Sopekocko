const express = require('express');
const bcrypt = require('bcrypt');
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
        /* utilisateur.save()
        .then(() => status(201).json({message: 'Un nouvel utilisateur a été enrgistré'}))
        .catch(error => res.status(400).json(error)) */
    })
    .catch(() => res.status(400).json({message: 'Echec'}));
}

