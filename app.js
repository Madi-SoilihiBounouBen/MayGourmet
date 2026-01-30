const express = require('express');

const app = express();

// Je précise que les vues sont dans le dossier views
app.set('views', './views');


//je précise qu'on utilise ejs pour les vues
app.set('view engine', 'ejs');

// Je précise que j'utilise le dossier 'public' qui contient les fichiers statics
app.use(express.static('public'));

app.get('/', (req, res) => {
    //Message à afficher : Bienvenue chez May Gourmet
    res.write("<h1>Bienvenue chez May Gourmet</h1>");

    //Fin de la réponse
    res.end();
});

app.get('/api/accueil', (req, res) => {
    console.log("Je passe dans /api/accueil");

    res.render('accueil');

    //Le type d'encodage
    //res.writeHead(200, { "content-type": "text/html;charset=utf-8"});

    //Le contenu qui sera affiché côté navigateur web
    //res.write("<p> Je suis à l'accueil</p>");

    //Fin de la réponse
    //res.end();
});

app.get('/api/equipe', (req, res) => {
    console.log("Je passe dans /api/equipe");

    
    res.render('equipe');




});


module.exports = app;