// Permet de vérifier le token
const jwt = require('jsonwebtoken');

// On vérifie si le corp de la requête contient
// un token créer avec la clef secrète
module.exports = (req, res, next) => {
    try {
        // On récupère le token dans le headers de la requête dans le champ Authorization
        const token = req.headers.authorization.split(' ')[1];
        // On vérifie si le token à bien était créé avec cette clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // On récupère le userId dans le token
        const userId = decodedToken.userId;
        /// On place le userId dans la requête pour
        // que nos différentes routes puissent l'exploiter
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({error});
    }
};