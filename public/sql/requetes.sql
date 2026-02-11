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



-- 1. Créer la table plat
CREATE TABLE plat (
    id_plat INT AUTO_INCREMENT PRIMARY KEY,
    nom_plat VARCHAR(100) NOT NULL,
    prix DECIMAL(10, 2),
    categorie VARCHAR(50),
    date_creation DATE
);

-- Desactiver la vérification des clés étrangères
SET FOREIGN_KET_CHECKS=0;

-- Supprimer la table fournisseur
drop table fournisseur;

-- réactiver la vérification des clés étrangères
SET FOREIGN_KET_CHECKS=1;

-- 2. Créer la table fournisseur
CREATE TABLE fournisseur IF NOT EXISTS(
    id_fournisseur INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom_fournisseur VARCHAR(100) NOT NULL,
    adresse VARCHAR(200),
    telephone VARCHAR(20),
    email VARCHAR(100),
    date_partenariat DATE
);

CREATE TABLE produit(
    id_produit INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    presentation VARCHAR (155),
    prix INT NOT NULL,
    origin VARCHAR(30) NOT NULL,
    categorie VARCHAR(30),
    disponibilite BOOLEAN DEFAULT False,
    type_culture VARCHAR(30),
    id_fournisseur INT NOT NULL,
    FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id_fournisseur)
);

-- 1. Supprimer la clé étrangère existante dans produit
ALTER TABLE produit
DROP FOREIGN KEY (id_fournisseur);  -- Remplacez par le nom réel

-- 2. Ajouter id_produit dans fournisseur avec sa clé étrangère
ALTER TABLE fournisseur
ADD COLUMN id_produit INT,
ADD FOREIGN KEY (id_produit) REFERENCES produit(id_produit);

-- 3. Recréer la clé étrangère dans produit
ALTER TABLE produit
ADD FOREIGN KEY (id_fournisseur) REFERENCES fournisseur(id);


-- 3. Lister les noms des tables existantes dans la base de données
SHOW TABLES;

-- 4. Ajouter 4 fournisseurs au minimum dans la table fournisseur
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Fournisseur Alimentaire Mayotte", "Kaweni, Mamoudzou", "0269612345", "contact@fam-mayotte.com", "2007-05-03");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("TETRAMA", "129 rue mazava 97600 Kaweni", "0269601234", "tetramagroupe@gmail.com", "2015-07-04");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Jambo", "Majicavo Lamir", "0269624567", "commande@pfoi.fr", "2019-09-10");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("BDM", "Mamoudzou Centre", "0269617890", "vente@BD-mayotte.com", "2010-12-12");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Kanga Passam", "4 Rue Mhogoni 97605 Passamainty", "0269677845", "contact@kanga.yt", "2010-12-12");

INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES('Metro Cash & Carry', '12 Avenue des Approvisionnements, 97615 Logoni', '01 45 67 89 00', 'contact@metro.fr', '2023-01-15');
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Mayana fruit", "28 Rue de la Logistique, 97606 Dzoumogué", "04 78 23 45 67", "commercial@mayanafruit.fr", "2023-03-20");
INSERT INTO fournisseur (nom_fournisseur, adresse, telephone, email, date_partenariat) VALUES("Transgourmet", "45 rue Appondja 97630 Acoua", "04 91 55 78 90", "info@transgourmet.fr", "2022-11-10");

-- 5. Afficher tous les fournisseurs enregistrés dans la table fournisseur
SELECT * FROM fournisseur;

-- 6. Modifier le nom d'un fournisseur
UPDATE fournisseur SET nom_fournisseur = "Mayana Gourmande" WHERE id = 1;

-- 7. Supprimer un fournisseur de votre choix
DELETE FROM fournisseur WHERE id = 4;

-- 8. Ajouter 5 plats dans la table plat
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Mataba", 12.50, "Plat traditionnel", "2026-02-01");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Poulet coco", 15.00, "Plat principal", "2026-01-29");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Brochettes de boeuf", 10.00, "Grillades", "2026-01-30");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Riz au lait de coco", 6.50, "Dessert", "26-02-03");
INSERT INTO plat (nom_plat, prix, categorie, date_creation) VALUES("Salade de papaye verte", 8.00, "Entrée", "26-02-02");

-- 9. Lister tous les plats enregistrés dans la table plat
SELECT * FROM plat;

-- 10. Modifier le nom d'un plat au choix
UPDATE plat SET nom_plat = "Poulet au curry et lait de coco" WHERE id_plat = 2;

-- 11. Supprimer un plat au choix
DELETE FROM plat WHERE id_plat = 5;



-- Vérification finale des fournisseurs restants
SELECT * FROM fournisseur;

-- Vérification finale des plats restants
SELECT * FROM plat;