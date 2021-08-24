const sauces = require('../schemas/sauces')
const fs = require('fs')

exports.toutesLesSauces = (req, res, next) => {

    sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(() => res.status(404).json({message: "impossible de recuperer les sauces"}))
}

exports.createSauce = (req, res, next) => {
    console.log(req.protocol, req.file.filename)
    console.log(req.body)
    console.log(req.body.sauce)
    console.log(req.body.image)

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
    .catch(() => res.status(400).json({message: "La sauce n'a pas été créée"}))   
}

exports.findSauce = (req, res, next) => {

    sauces.findOne({_id: req.params.id})
    .then((sauce) => res.status(200).json(sauce))
    .catch(() => res.status(404).json({message: "Cette sauce n'existe pas"}))
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

exports.modifyLikes = (req, res, next) => {
    
    sauces.findOne({_id: req.params.id})
    .then((sauce) => {
        
        const body = {
            ...req.body
        }
        const like = body.like
        const userId = body.userId
        
        /* Je recupere les valeurs des index userId contenu dans les tableaux que je mets comme conditions */
        var indexLiked = sauce.usersLiked.indexOf(userId)
        var indexDisliked = sauce.usersDisliked.indexOf(userId)

        if (like === 1 && indexLiked === -1 && indexDisliked === -1) { /* userid est dans auncun des tableaux */

            sauce.likes++
            sauce.usersLiked.push(userId)
                               
        } 
        
        else if (like === -1 && indexLiked === -1 && indexDisliked === -1) {
            
            sauce.dislikes++
            sauce.usersDisliked.push(userId)
                    
        } 

        else if (like === 0 && indexLiked != -1) { 
                
            sauce.likes--
            sauce.usersLiked.splice(indexLiked, 1) /* je supprime l'userId a son index array correspondant */
                       
        }

        else if (like === 0 && indexDisliked != -1) {
            
            sauce.dislikes--
            sauce.usersDisliked.splice(indexDisliked, 1)
             
        }
        sauce.save()
            .then((sauce) => res.status(201).json(sauce))
            .catch(() => res.status(401).json({message: "erreur envoie du like"}))        
    })
    .catch(() => res.status(400).json({message: "Impossible de trouver la sauce"}))
}





