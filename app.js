const express = require('express');

// J'importe le pilote Mysql2 utilisé pour interroger la BDD Mysql
const mysql2 = require('mysql2');

// J'importe le pilote express-myconnection utilisé pour se connecter à la BDD
const myConnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

// Je configure les éléments attendus pour me connecter à la MySQL
const optionsConnectionBaseDeDonnees = {
    host: "localhost",
    user: "root",
    password: "marouvatou27BNR**",//pas sécurisé de l'écrire ici
    database: "maygourmet",
    port:3306
};

/* Middleware pour se connecter
* "pool" est la stratégie de connexion à la base de données
*/
app.use(myConnection(mysql2, optionsConnectionBaseDeDonnees, "pool"));

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

    // 1. Je me connecte à la BDD grâce à la méthode getConnection()
    req.getConnection((erreur, connection) =>{
        if(erreur){// Je vérifie s'il y a une erreur lors de la connexion à la BDD
            console.log(erreur);
        } else{
            connection.query("SELECT * FROM equipe", [], (err, resultatEquipe) => {
                if(err) {
                    console.log("Erreur dans la requête SQL SELECT : ");
                } else {
                    console.log("Mon équipe : ", resultatEquipe);

                    res.render("equipe", {resultatEquipe});
                }
            });
        }
    });




});


module.exports = app;