# Client-Dashboard

## Dépendances
Ce service nécessite la gateway, users-service, et contract-service pour fonctionner correctement.

## Mise en route
Pour lancer Client-Dashboard, utilisez la commande `Docker compose up` exécutée à la racine du projet. Cela initie les services nécessaires et configure l'environnement pour le fonctionnement de l'application.

## Fonctionnalités
- **Inscription et connexion des utilisateurs :** Les utilisateurs doivent s'inscrire et se connecter pour accéder aux outils fournis par Client-Dashboard.
- **Contrôle d'accès basé sur les rôles :** Le système met en œuvre un mécanisme de vérification de rôle de base. Par défaut, un utilisateur se voit attribuer le rôle de "commercial", ce qui lui permet de gérer les contrats et d'accéder aux tableaux de bord.
- **Accessibilité du tableau de bord :** L'accès aux tableaux de bord dépend du rôle. Les utilisateurs disposant des autorisations appropriées peuvent naviguer vers les tableaux de bord en cliquant sur le bouton "Tableau de bord" situé sur le côté droit de l'en-tête.
- **Flexibilité de navigation :** Un bouton intitulé "Contrats" apparaît lorsque les utilisateurs consultent les tableaux de bord. Ce bouton permet aux utilisateurs de basculer facilement vers l'interface précédente.
