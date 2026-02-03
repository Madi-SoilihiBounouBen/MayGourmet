-- Création de la base de données du restaurant MayGourmet
CREATE DATABASE maygourmet;

-- Sélection de la base de données (à exécuter avant les requêtes suivantes)
-- USE maygourmet;

-- Création de la table "equipe" qui stocke les salariés du restaurant
CREATE TABLE equipe (
    -- Identifiant unique de chaque salarié, incrémenté automatiquement
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

    -- Nom de famille du salarié
    nom VARCHAR(155) NOT NULL,

    -- Prénom du salarié
    prenom VARCHAR(155) NOT NULL,

    -- Adresse email (champ facultatif)
    mail VARCHAR(100),

    -- Numéro de téléphone du salarié
    telephone VARCHAR(100) NOT NULL,

    -- Poste occupé dans le restaurant (serveur, cuisinier, gérant, etc.)
    poste VARCHAR(80) NOT NULL,

    -- Adresse postale du salarié (champ facultatif)
    adress_postale VARCHAR(250),

    -- Courte présentation ou description du salarié (champ facultatif)
    presentation VARCHAR(255),

    -- Date de recrutement du salarié
    date_recrutement DATE
);

-- Affiche toutes les tables présentes dans la base de données
SHOW TABLES;

-- Insertion de la gérante du restaurant
INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES("SAID", "Fatima", "sfatima@gmail.com","0639123456", "Gérante", "4 Rue Maféliki 97630 Acoua", "Passionnée de cuisine traditionnelle", "2015-02-01");

-- Insertion du responsable de salle
INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES("ALI", "Said", "said.ali@email.com","0612345678", "Responsable de salle", "12 rue des Lilas, 97600 Mamoudzou", "Responsable de salle sérieux et organisé, Said coordonne l’équipe, accueille les clients, veille au bon déroulement du service et garantit la satisfaction de la clientèle.", "2013-09-01");

-- Insertion d’un serveur
INSERT INTO equipe 
(nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES("COMBO", "Ali", "ali.combo@email.com", "0623456789","Serveur",
"25 avenue de la République, 97640 Sada", "Serveur dynamique et souriant, Ali assure l’accueil des clients, la prise des commandes et le service en salle tout en garantissant une excellente expérience client.", "2024-12-09");

-- Insertion d’une cuisinière
INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES("KAMA", "Amina", "amina.kama@email.com", "0634567890", "Cuisinière", "8 boulevard Voltaire, 97610 Hajangoua", "Cuisinière organisée et passionnée, Amina participe à la préparation des plats, veille au respect des normes d’hygiène et contribue à la qualité des menus du restaurant.", "2021-05-03");

-- Insertion d’un commis de cuisine
INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES("ABDOU", "Nassim", "nassim.abdou@email.com", "0692123456", "Commis de cuisine", "5 rue du Marché, 97600 Mamoudzou", "Commis de cuisine motivé et rigoureux, Nassim assiste le chef dans la préparation des plats, le dressage et veille au respect des règles d’hygiène.", "2024-10-01");

-- Insertion d’une serveuse
INSERT INTO equipe (nom, prenom, mail, telephone, poste, adress_postale, presentation, date_recrutement) VALUES("SOULEY", "Hana", "hana.souley@email.com","0692234567", "Serveuse", "18 rue du Lagon, 97600 Koungou", "Serveuse accueillante et attentive, Hana assure le service en salle, le conseil aux clients et contribue à une ambiance chaleureuse au sein du restaurant.", "2024-10-01");
