const multer = require('multer')

const MIME_TYPE = { /* POUR DEFINIR LE TYPE D'IMAGE QUE NOUS RECEVRONS */
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({
    destination: function (req, file, event) {
        event(null, "images")
    },
    filename: function (req, file, event) {
        const name = file.originalname.split(' ').join("_")
        const extension = MIME_TYPE[file.mimetype]
        event(null, name + "_" + Date.now() + extension)
    }
})

module.exports = multer({storage}).single('image')