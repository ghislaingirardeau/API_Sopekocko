const sauces = require('../schemas/sauces')
const fs = require('fs')

exports.listeSauces = (req, res, next) => {
    sauces.find()
    .then(sauces => res.status(200).json({sauces}))
    .catch(() => res.status(404).json({message: "impossible de recuperer les sauces"}))
}

exports.createSauce = (req, res, next) => {
    const sauceOject = JSON.parse(req.body.sauce);
    const sauce = new sauces({
        ...sauceOject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,       
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then((sauce) => res.status(201).json({sauce}))
    .catch(() => res.status(401).json({message: "La sauce n'a pas été créer"}))
    
};

exports.updatesauce = (req, res, next) => {

}


/* MODE DEVELOPPEMENT */
exports.deletesauce = (req, res, next) => {
        sauces.deleteMany({sauces})
        .then(() => res.status(201).json({message: "suppression OK"}))
        .catch(() => res.status(401).json({message: "echec supp"})) 
}



