const sauces = require('../schemas/sauces')
const likes = require ('../schemas/likes')
const fs = require('fs')

exports.tableauSauces = (req, res, next) => {

    sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(() => res.status(404).json({message: "impossible de recuperer les sauces"}))
}

exports.createSauce = (req, res, next) => {

    const sauceOject = JSON.parse(req.body.sauce)
    const sauce = new sauces({
        ...sauceOject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,       
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })

    sauce.save()
    .then((sauce) => res.status(201).json({sauce}))
    .catch(() => res.status(401).json({message: "La sauce n'a pas été créée"}))
    
}

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

/* recherche du jaime dans la req.body */

exports.modifyLikes = (req, res, next) => {
    
    sauces.findOne({_id: req.params.id})
    .then((sauce) => {
        
        const like = new likes({
            ...req.body
        })
        
        delete like._id
        /* Je recupere les valeurs des index userId que je mets comme conditions */
        var indexLiked = sauce.usersLiked.indexOf(like.userId)
        var indexDisliked = sauce.usersDisliked.indexOf(like.userId)

        if (like.jaime === 1 && indexLiked === -1 && indexDisliked === -1) { /* userid est dans auncun des tableaux */

            sauce.likes += 1
            sauce.usersLiked.push(like.userId)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))                     
        }
        
        if (like.jaime === -1 && indexLiked === -1 && indexDisliked === -1) {
            
            sauce.dislikes += 1
            sauce.usersDisliked.push(like.userId)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))          
        } 

        if (like.jaime === 0) { 

            if (indexLiked != -1) {
                
            sauce.likes -= 1
            sauce.usersLiked.splice(indexLiked, 1) /* je supprime l'userId a son index array correspondant */
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))                
            }

            if (indexDisliked != -1) {

            sauce.dislikes -= 1
            sauce.usersDisliked.splice(indexDisliked, 1)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))  
            }

        } 
        
        /* RAS POUR TEST A SUPPR */
        if (like.jaime === 2) {
            sauce.dislikes = 0
            sauce.likes = 0
            sauce.usersDisliked = []
            sauce.usersLiked = []
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))  
        }
       
    })
    .catch(() => res.status(400).json({message: "Impossible de trouver la sauce"}))
}

/* var ajoutLikes = function (likes, tableau, user) {
    likes += 1
    tableau.push(user)
    console.log(likes)
}
} */





