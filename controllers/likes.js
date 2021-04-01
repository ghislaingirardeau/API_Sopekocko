const likes = require ('../schemas/likes')
const sauces = require ('../schemas/sauces')

exports.modifyLikes = (req, res, next) => {
   
    const like = new likes({
        ...req.body.like
    })
    console.log(like) 
}

/* if(req.body.jaime === 0) {

        }
    sauces.findOne({_id: req.params.id})
    .then(() => {
        console.log("id trouve")
    })
    .catch() */