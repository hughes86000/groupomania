const passwordSchema = require("../models/password.model");

// On vérifie si le password envoyé par l'utilisateur respecte le modèle
module.exports = (req, res, next) => {

    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({
            message: "le mot de passe doit comprendre 8 caractères dont deux chiffre, sans espaces. Ainsi qu'une lettre majuscule et minuscule."
        });
    } else {
        next();
    }
};