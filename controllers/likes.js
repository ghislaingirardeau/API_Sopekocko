const likes = require ('../schemas/likes')
const sauces = require ('../schemas/sauces')

exports.modifyLikes = (req, res, next) => {
    
    sauces.findOne({_id: req.params.id})
    .then((sauce) => {
        
        const like = new likes({
            ...req.body
        })
        
        delete like._id
        
        if (like.jaime === 1 && sauce.usersLiked.indexOf(like.userId) === -1 && sauce.usersDisliked.indexOf(like.userId) === -1) {
            
            var compteur = sauce.likes + 1
            sauce.likes = compteur
            sauce.usersLiked.push(like.userId)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))
          
        } 
        
        if (like.jaime === -1 && sauce.usersLiked.indexOf(like.userId) === -1 && sauce.usersDisliked.indexOf(like.userId) === -1) {
            
            var compteur = sauce.dislikes + 1
            sauce.dislikes = compteur
            sauce.usersDisliked.push(like.userId)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))
          
        } 

        if (like.jaime === 0) {

            if (sauce.usersLiked.indexOf(like.userId) != -1) {
                
                var compteur = sauce.likes - 1
                sauce.likes = compteur
                var index = sauce.usersLiked.indexOf(like.userId)
                sauce.usersLiked.splice(index, 1)
                sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))                
            }

            if (sauce.usersDisliked.indexOf(like.userId) != -1) {
                sauce.dislikes = 0
                sauce.usersDisliked = []
                sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))
            }

        } else {
            console.log("vous avez deja liker cette sauce")
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))
        }                            
    })
    .catch(() => res.status(400).json({message: "Impossible de trouver la sauce"}))
}


/*     */

/* const ajoutLikes = function (nmbre, like, tableau) {
    var compteur = like + nmbre
    like = compteur
    tableau.push(like.userId)
    res.status(200).json(sauce) 
} */
