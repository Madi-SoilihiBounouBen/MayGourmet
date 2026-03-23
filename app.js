const express = require('express');

// J'importe le pilote Mysql2 utilisé pour interroger la BDD Mysql
const mysql2 = require('mysql2');

// J'importe le pilote express-myconnection utilisé pour se connecter à la BDD
const myConnection = require('express-myconnection');
const connection = require('express-myconnection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// API Route supprimer un membre de l'équipe
// Methode : DELETE
// exemple : localhost:3004/api/equipe/1
app.delete('/api/equipe/:id', (req, res) => {
    const idMembreEquipe = req.params.id;
    const queryDelete = "DELETE FROM equipe WHERE id = ?";

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur suppression equipe : ", erreur);
            res.status(500).json({ erreur: "Erreur de connexion à la base de données" });
        } else {
            connection.query(queryDelete, [idMembreEquipe], (err, resultat) => {
                if (err) {
                    console.log("Erreur requete Suppression : ", err);
                    res.status(500).json({ erreur: "Erreur lors de la suppression" });
                } else {
                    console.log("Bravo ! Le membre est supprimé dans la table équipe");
                    res.status(200).json({ routeAccueil : "/api/accueil", message: "Membre supprimé avec succès" });
                }
            })
        }
    });
});

/**
 * API pour ajouter un membre d'équipe
 * Le membre sera inséré dans la table equipe.
 */

app.post('/api/equipe/', (req, res) => {
    console.log("Corps de la requête : ", req.body);

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const mail = req.body.mail;
    const telephone = req.body.telephone;
    const poste = req.body.poste;
    const adresse = req.body.adresse;
    const presentation = req.body.presentation;
    const dateRecrutement = req.body.dateRecrutement;

    const requeteSql = "INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const ordreChamps = [nom, prenom, mail, telephone, poste, adresse, presentation, dateRecrutement];

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log("Erreur de connexion à la BDD : ", erreur);
        } else {
            connection.query(requeteSql, ordreChamps, (err, nouveauMembre) => {
                if(err) {
                    console.log("Erreur d'ajout équipe : ", err);
                } else {
                    console.log("Bravo ! Nouveau membre ajouté.");
                    res.status(300).redirect("/api/accueil");
                }
            });
        }
    });
});

app.put('/api/equipe/:id', (req, res) => {
    // Je détaille la manière dont je vais recevoir les données de modification d'un membre d'équipe
});

//J'ajoute un fournisseur dans la table fournisseur. Pour cela, j'utilise la méthode POST
app.post('/api/fournisseur', (req, res) => {
    console.log("Corps de la requête : ", req.body);
    
    console.log(req.body.nomFournisseur);
    const nomFournisseur = req.body.nomFournisseur;

    console.log(req.body.responsableFournisseur);
    const responsableFournisseur = req.body.responsableFournisseur

    console.log(req.body.emailFournisseur);
    const emailFournisseur = req.body.emailFournisseur;

    console.log("Téléphone du fournisseur : ", req.body.telephoneFournisseur);
    const telephoneFournisseur = req.body.telephoneFournisseur;

    console.log("Adresse fournisseur : ", req.body.adresseFournisseur);
    const adresseFournisseur = req.body.adresseFournisseur;

    console.log("Date de partenariat : ", req.body.datePartenariat);
    const datePartenariat = req.body.datePartenariat;

    console.log("Présentation du fournisseur : ", req.body.presentationFournisseur);
    const presentationFournisseur = req.body.presentationFournisseur;

    const requeteSql = "INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat, responsable, presentation) VALUES(?, ?, ?, ?, ?, ?, ?)";

    const ordreChamps = [nomFournisseur, adresseFournisseur, telephoneFournisseur, emailFournisseur, datePartenariat, responsableFournisseur, presentationFournisseur];

    //Je me connecte à la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {//s'il y a une erreur
            console.log("Erreur de connexion à la BDD : ", erreur);
        } else{ //Si j'ai réussi à me connecter à la BDD
            connection.query(requeteSql, ordreChamps, (err, nouveauFournisseur) => {
                if(err) {
                    console.log("Erreur d'ajout fournisseur : ", err);
                } else{
                    console.log("Bravo ! Nouveau fournisseur ajouter.");

                    // Je redirige vers la page d'accueil
                    res.status(300).redirect("/api/accueil");
                }
            });
        }
    });

});




app.get('/api/fournisseur', (req, res) => {
    res.render('fournisseur');
})


module.exports = app;