---
subtitle: The Poire
title: Projet My-shop
---

Ce document explique comment mettre en fonctionnement le projet My-Shop,
réalisé par Briac Dassier et Théotime Berthod.

# Installation

Pour installer le projet, suivez ces étapes :

1.  Rendez-vous dans votre dossier de travail et collez la commande
    suivante : « \*git clone git@github.com/theotime2005/my-shop.git\* »

2.  Si vous disposez déjà de « my-shop-api », vous pouvez la lancer.
    Sinon, reportez-vous à la documentation de my-shop-api pour lancer
    docker,

3.  Entrer la commande suivante dans votre terminal : « \*cd front\* »

4.  Vous vous trouvez maintenant dans le dossier front du projet, vous
    allez lancer le site internet

5.  Tapez la commande suivante « \*npm install\* » ou bien « \*npm i\* »

6.  Pour lancer le projet en mode développement, tapez « \*npm run
    dev\* » puis pressez la lettre « O » de votre clavier.

# Fonctionnement

Ce site a été conçu à l'aide du framework Vue.js, combiné avec une API
reposant sur docker. Nous nous devons de signaler que cette API est male
documentée et son fonctionnement très peut claires. Cependant, les
fonctions suivante sont à l'heure implémentées :

-   Ajouter un produit : Permet d'ajouter un produit à la base. Nous
    n'avons pas utilisé les catégories, car celle-ci restent à ce jour
    un mystère pour ce qui est de leur gestion.

-   Modifier un produit : Modifier son nom, son prix, ainsi que sa
    description,

-   Supprimer un produit : Supprime le produit de la base.

# Les utilisateurs

> Actuellement, il est possible d'accéder à un panneau d'administration
> via un bouton « log in », un email et un mot de passe. La gestion des
> utilisateurs n'est pour le moment pas supportée depuis l'interface.
>
> Date de révision : 17/11/2023
