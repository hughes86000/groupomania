// Package gestion de fichier Permet de gérer les fichiers entrants dans les requêtes HTTP
const multer = require('multer')

// Permet de convertir le mime-types du fichier en extension
const MIME_TYPES = {
    'image/jpg': 'jpg', 'image/jpeg': 'jpg', 'image/png': 'png'
}

// Objet de configuration de multer
const storage = multer.diskStorage({
    // On définit la destination
    destination: (req, file, callback) => {
        callback(null, 'images')
    }, // On définit le nom du fichier
    filename: (req, file, callback) => {
        // On remplace les espaces par des underscore
        const name = file.originalname.split(' ').join('_')
        const extension = MIME_TYPES[file.mimetype]
        // On ajoute Date.now pour rendre le fichier unique, cela ajoute
        // une date de la création du fichier à la ms prêt
        callback(null, name + Date.now() + '.' + extension)

    }
})

// On exporte multer pour les routes
module.exports = multer({storage}).single('imagePost')