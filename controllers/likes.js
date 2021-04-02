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
                .then((sauce) => res.status(201).json({sauce}))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))
          
        }   
        
        if (like.jaime === -1 && sauce.usersLiked.indexOf(like.userId) === -1 && sauce.usersDisliked.indexOf(like.userId) === -1) {
            
            var compteur = sauce.dislikes + 1
            sauce.dislikes = compteur
            sauce.usersDisliked.push(like.userId)
            res.status(200).json(sauce)
          
        } 

        /* if (like.jaime === 0 && sauce.usersLiked.indexOf(like.userId) != -1) {
            var compteur = sauce.likes - 1
            sauce.likes = compteur

        } */
        
        else{
            res.status(400).json({message: "vous avez deja liker cette sauce"})
        }
          
    })
    .catch(() => res.status(400).json({message: "vous avez deja liker cette sauce"}))
}


/*     */

/* const ajoutLikes = function (nmbre, like, tableau) {
    var compteur = like + nmbre
    like = compteur
    tableau.push(like.userId)
    res.status(200).json(sauce) 
} */
