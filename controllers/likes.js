const likes = require ('../schemas/likes')
const sauces = require ('../schemas/sauces')

exports.modifyLikes = (req, res, next) => {
    
    sauces.findOne({_id: req.params.id})
    .then((sauce) => {
        res.status(200).json(sauce) /* recuperer l'userId de la sauce concerné, pour l'envoyer dans le schema */

        const like = new likes({
            userId: sauce.userId,
            jaime: req.body.jaime
        })
        console.log(like)
        delete like._id
        
        if (like.jaime === 0) {
        console.log("je change") 
        }  
        if (like.jaime === 1) {
        console.log("j'aime") 
        }  
        if (like.jaime === -1) {
            console.log("je n'aime pas") 
            } 
    })
    .catch()
}

/* if(req.body.jaime === 0) {

        }
    sauces.findOne({_id: req.params.id})
    .then(() => {
        console.log("id trouve")
    })
    .catch() */