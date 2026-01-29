const express = require('express');

const app = express();

app.get('/', (req, res) => {
    //Message à afficher : Bienvenue chez May Gourmet
    res.write("<h1>Bienvenue chez May Gourmet</h1>");

    //Fin de la réponse
    res.end();
});

app.get('/api/accueil', (req, res) => {
    console.log("Je passe dans /api/accueil");

    //Le type d'encodage
    res.writeHead(200, { "content-type": "text/html;charset=utf-8"});

    //Le contenu qui sera affiché côté navigateur web
    res.write("<p> Je suis à l'accueil</p>");

    //Fin de la réponse
    res.end();
});








module.exports = app;