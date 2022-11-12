const http = require('http');
const app = require('./app');


//Ajout de la normalisation de port
// Cette fonction nous renvoie un port valide, sous forme de numéro ou d'une chaine de caractère
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.port || '4000');
app.set('port', port);

// Gestion des erreurs pour rendre le serveur plus constant et facile à déboguer
// Recherche les différentes erreurs et les gère de manière appropriée,
// elles seront ensuite enregistrées dans le serveur
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port: ' + port;
    switch (error.code) {
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// On démarre le serveur
// un écouteur d'évènements est également enregistré, consignant le port
// ou le canal nommé sur lequel le serveur s'exécute dans la console.
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);


