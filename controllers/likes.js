const likes = require ('../schemas/likes')
const sauces = require ('../schemas/sauces')



exports.modifyLikes = (req, res, next) => {
    
    sauces.findOne({_id: req.params.id})
    .then((sauce) => {
        
        const like = new likes({
            ...req.body
        })
        
        delete like._id
        
        if (like.jaime === 1 && sauce.usersLiked.indexOf(like.userId) === -1) {
            
            var compteur = sauce.likes + 1
            sauce.likes = compteur
            sauce.usersLiked.push(like.userId)
            res.status(200).json(sauce)
          
        } else{
            console.log('userId deja present dans le tableau')
        }
        if (like.jaime === -1 && sauce.usersDisliked.indexOf(like.userId) === -1) {
            
            var compteur = sauce.likes + 1
            sauce.dislikes = compteur
            sauce.usersDisliked.push(like.userId)
            res.status(200).json(sauce)
          
        } else{
            console.log('userId deja present dans le tableau')
        }
        
          
    })
    .catch()
}


/*     */

/* const ajoutLikes = function (nmbre, sauce) {
    var compteur = sauce.likes + nmbre
    sauce.likes = compteur
    sauce.usersLiked.push(like.userId)
    res.status(200).json(sauce) 
} */
