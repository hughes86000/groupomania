// Permet de crypter le mot de passe
const bcrypt = require('bcrypt');
// Permet de créer un token
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

// Créer un userModel
// Créer un user
exports.signup = (req, res, next) => {




        // On crypte le mot de passe
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newUser = new userModel({
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    email: req.body.email,
                    password: hash,
                    isAdmin: false
                });
                // On sauvegarde user dans la base de donnée
                newUser.save()
                    .then((response) => {
                        console.log(response);
                        res.status(201).json({response})
                    })
                    .catch(error => res.status(400).json({error}));


            })
            .catch(error => res.status(500).json({error}));
    }
// Connection
    exports.login = (req, res, next) => {
        //On récupère l'utilisateur dans la base de donnée
        userModel.findOne({email: req.body.email})
            .then(user => {
                if (user === null) {
                    console.log(user)
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
                } else {
                    // On compare le password dans la requête à celui de la base donnée
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
                            } else {

                                // On crée un token qu'on renvoie à l'utilisateur
                                res.status(200).json({
                                    userId: user._id,
                                    token: jwt.sign(
                                        {userId: user._id},
                                        'RANDOM_TOKEN_SECRET',
                                        {expiresIn: '24h'}
                                    )
                                });
                            }
                        })
                        .catch(error => res.status(500).json({error}));
                }
            })
            .catch(error => res.status(500).json({error}));
    };

exports.getOneUser = (req, res, next) => {
    userModel.findOne({_id: req.query.userId}).select('-password -email')
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}))
}
