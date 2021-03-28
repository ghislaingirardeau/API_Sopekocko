const sauces = require('../schemas/sauces')

exports.listesauces = (req, res, next) => {
    sauces.find()
    .then(sauces => res.status(200).json({sauces}))
    .catch(() => res.status(404).json({message: "impossible de recuperer les sauces"}))
}

exports.ajoutsauce = (req, res, next) => {
    const sauce = new sauces({
        ...req.body,
        likes: 0,
        dislikes: 0
    });
    sauce.save()
    .then((sauce) => res.status(201).json({sauce}))
    .catch()
};

exports.updatesauce = (req, res, next) => {

}

exports.deletesauce = (req, res, next) => {

}

/* sauce.save()
    .then((sauce) => res.status(201).json({sauce}))
    .catch() */