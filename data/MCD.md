utilisateur: code utilisateur, pseudo, email, mot de passe  
livre: code livre, titre, description, date de début de lecture, date de fin de lecture, nombre de pages, note sur 5
catégorie: code catégorie, nom
auteur: code auteur, nom, prénom
statut: code statut, description

posséder, 0N utilisateur, 11 livre
appartenir, 11 livre, 0N catégorie
avoir, 11 livre, 0N statut
écrire, 0N auteur, 11 livre
