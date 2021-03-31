const sauces = require('../schemas/sauces')
const fs = require('fs')

exports.listeSauces = (req, res, next) => {

    sauces.find()
    .then(sauces => res.status(200).json(sauces))
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

exports.findSauce = (req, res, next) => {

    sauces.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(() => res.status(401).json({message: "Cette sauce n'existe pas"}))
}

exports.updateSauce = (req, res, next) => {
    
    var sauceObject
    if(req.file === undefined) {
        sauceObject =  { 
            ...req.body
        }
    } else {
        console,log(req.file.filename)
        sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }
    }
   
    sauces.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id}) /* quand il fait la modif de la sauce je confirme l'id */
     .then((sauce) => res.status(200).json({sauce}))
     .catch(() => res.status(400).json({message: "modification impossible"}))
}

exports.deleteSauce = (req, res, next) => {
    
    sauces.findOne({_id : req.params.id})
    .then((sauce) => {

       const imageName = sauce.imageUrl.split("/images/")[1]

       fs.unlink(`images/${imageName}`, () => { 
        
            sauces.deleteOne({_id : req.params.id})
            .then(() => res.status(200).json({message: "suppression réussie"}))  
            .catch(() => res.status(400).json({message: "suppression impossible"}))
        })  
    })
    .catch(() => res.status(500).json({message: "image non trouvé"})) 
}


/* MODE DEVELOPPEMENT */
/* exports.deleteAllsauce = (req, res, next) => {
        sauces.deleteMany({sauces})
        .then(() => res.status(201).json({message: "suppression OK"}))
        .catch(() => res.status(401).json({message: "echec supp"})) 
}
 */




