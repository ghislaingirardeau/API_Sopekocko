const likes = require ('../schemas/likes')
const sauces = require ('../schemas/sauces')

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
        
        
        if (like.jaime === 1 && indexLiked === -1 && indexDisliked === -1) {
            
            var compteur = sauce.likes + 1
            sauce.likes = compteur
            sauce.usersLiked.push(like.userId)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))         
        } 
        
        if (like.jaime === -1 && indexLiked === -1 && indexDisliked === -1) {
            
            var compteur = sauce.dislikes + 1
            sauce.dislikes = compteur
            sauce.usersDisliked.push(like.userId)
            sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))          
        } 

        if (like.jaime === 0) { 
                        
            
            if (indexLiked != -1) {
                
                var compteur = sauce.likes - 1
                sauce.likes = compteur
                sauce.usersLiked.splice(indexLiked, 1) /* je supprime l'userId a son index array correspondant */
                sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))                
            }

            if (indexDisliked != -1) {

                var compteur = sauce.dislikes - 1
                sauce.dislikes = compteur
                sauce.usersDisliked.splice(indexDisliked, 1)
                sauce.save()
                .then((sauce) => res.status(201).json(sauce))
                .catch(() => res.status(401).json({message: "erreur envoie du like"}))  
            }

        } 
        else {
            console.log("vous avez deja liker cette sauce")
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


/*     */

/* const ajoutLikes = function (nmbre, like, tableau) {
    var compteur = like + nmbre
    like = compteur
    tableau.push(like.userId)
    res.status(200).json(sauce) 
} */
