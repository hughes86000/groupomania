require('dotenv').config();
const express = require('express');
// Communiquer avec la base de donnée
const mongoose = require('mongoose');
// Permet d'accéder à la racine du back
const path = require('path');
const helmet = require("helmet");
const stuffRoutes = require('./routes/post.route');
const userRoutes = require('./routes/user.route');

// On se connecte à la base de donnée
mongoose
.connect(
  process.env.SECRET_DB,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// On crée l'application express
const app = express();

//On applique helmet pour sécuriser toutes nos requêtes/responses
app.use(helmet({
    crossOriginEmbedderPolicy: false,
}));

// Cross-Origin Resource Sharing, permet au serveur de renvoyer les en-têtes HTTP requis par la norme CORS.
app.use((req, res, next) => {
    // Permet d'accéder à notre api depuis n'importe quelle origine '*'
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // éviter les erreurs par rapport à helmet, quand les ressources ne sont pas de la même origine
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
});


// On rend le body de notre requête accessible comme un objet javascript
app.use(express.json());



// Permet au front d'accéder au dossier image
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;