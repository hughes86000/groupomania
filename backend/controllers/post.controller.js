const Post = require("../models/post.model");
// fs signifie file system il nous donne accès aux fonctions qui
// nous permettent de modifier le système de fichiers,
// y compris aux fonctions permettant de supprimer les fichiers.
const fs = require('fs');
const userModel = require("../models/user.model");

///// On crée un objet dans la base de donnée
exports.createPost = (req, res, next) => {
    const postObject = req.body;
    // console.log(req.body);
    // console.log(req.file);
    const post = new Post({
        // On colle l'objet présent dans la requête
        ...postObject,
        likes: 0,
        usersLiked: [],
        // On récupère le protocole de la requête : HTTP, on récupère l'ôte du serveur : 'localhost:3000', et le nom du fichier
        imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
    });
    // On sauvegarde l'objet dans la base de donnée,
    post.save()
        .then(() => { res.status(201).json(post)})
        .catch(error => { res.status(400).json( { error })})
};



// Modifier un objet dans la base de donnée
exports.modifyPost = (req, res, next) => {
    // On vérifie si l'utilisateur a mis à jour l'image ou pas. Dans le premier cas, nous recevrons
    // l'élément form-data et le fichier. Dans le second cas,
    // nous recevrons uniquement les données JSON.
    const postObject = req.file ? {
        // On transforme la chaine de caractère en objet js exploitable
        ... req.body,
        // On récupère le protocole de la requête : HTTP, on récupère l'ôte du serveur : 'localhost:3000', et le nom du fichier
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._userId;
    // On récupère l'objet correspondant à l'id dans les paramètres de l'appel fetch
    Post.findOne({_id: req.params.id})
        .then((post) => {
            // Si l'userId est différent celui dans la requête 'not authorized'
            if (req.auth.isAdmin){
                //Sinon on remplace l'objet avec le même id que celui présent dans l'appel fetch, par celui de la requête
                Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
            }
            else if (post.userId !== req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                //Sinon on remplace l'objet avec le même id que celui présent dans l'appel fetch, par celui de la requête
                Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Objet modifié!'}))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};



// Supprimer un objet
exports.deletePost = (req, res, next) => {
    // On récupère l'objet dans la base de donnée
    Post.findOne({ _id: req.params.id})
        .then(post => {
            // Si l'userId de l'objet est différend de celui récupérer dans le token
            console.log(req.body);
            if(post.userId === req.auth.userId || req.auth.isAdmin) {
                // Sinon on supprime l'image de notre serveur et l'objet de la base de donnée
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
            else  {
                res.status(401).json({message: 'Not authorized'});
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// On récupère la post qui correspond à l'id passé dans les paramètres
exports.getOnePost = (req, res, next) => {
    Post.findOne({_id: req.params.id})
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({error}))
}

//On récupère toutes les posts
exports.getAllPost = (req, res, next) => {
    Post.find()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({error}))
}

// L'utilisateur aime / n'aime pas une post
exports.likePost = (req, res, next) => {
    const postId = req.body.id;
    const userId = req.body.userId;
    const like = req.body.like;

    // L'utilisateur aime une post pour la première fois (like === 1)
    // On incrémente + 1 au nombre de like, et on push le userId dans le tableau userLiked
    if (like === 1) {
        Post.updateOne(
            { _id: postId },
            {
                $push: { usersLiked: userId },
                $inc: { likes: like },

            }
        )
            .then((post) => res.status(200).json({ message: "post appréciée" }))
            .catch((error) => res.status(500).json({ error }));
    }


        // L'user change d'avis
    // L'utilisateur retire son like
    else if (like === 0) {
        Post.findOne({ _id: postId })
            .then((post) => {
                if (post.usersLiked.includes(userId)) {
                    Post.updateOne(
                        { _id: postId },
                        { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
                    )
                        .then((post) => {
                            res.status(200).json({ message: "post dépréciée" });
                        })
                        .catch((error) => res.status(500).json({ error }));
                    // L'utilisateur retire son dislike
                 } //else if (post.usersDisliked.includes(userId)) {
                //     Post.updateOne(
                //         {_id: postId},
                //         {
                //             $pull: {usersDisliked: userId},
                //             $inc: {dislikes: -1},
                //         }
                //     )
                //         .then((post) => {
                //             res.status(200).json({message: "Avis neutre"});
                //         })
                //         .catch((error) => res.status(500).json({error}));
                // }
            })
            .catch((error) => res.status(401).json({ error }));
    }
};