// On créer notre modèle user
const mongoose = require('mongoose');
// Permet de s'assurer qu'on ne puisse pas créer 2 user avec le même email
const uniqueValidator = require('mongoose-unique-validator');
// Permet de vérifier le format l'email


const postSchema = new mongoose.Schema(
    {
        userId: {type:String, required:true},
        nom: {type: String, required: true, minLength: 3, maxLength: 55},
        prenom: {type: String, required: true, minLength: 3, maxLength: 55},
        description: {type:String, required: true,maxLength: 500},
        imageUrl: {type:String},
        likes: {type:Number},
        usersLiked: {type: [String]}
    },
    {
        timestamps: true
    }
);

postSchema.plugin(uniqueValidator);
// On exporte le modèle pour les controllers
module.exports = mongoose.model('post', postSchema);