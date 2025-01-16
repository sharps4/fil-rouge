# Configuration de la Base de Données - SQLite3

## Introduction

Ce projet utilise **SQLite3** comme moteur de base de données. SQLite3 est un moteur de base de données sans serveur, autonome et léger qui stocke l'intégralité de la base de données dans un seul fichier. Cette configuration **ne nécessite pas de nom d'utilisateur ni de mot de passe** pour accéder à la base de données, ce qui la rend idéale pour les environnements de développement locaux et les tests.

> **Note** : Cette configuration **n'est pas adaptée aux environnements de production**, car SQLite est principalement conçu pour des cas d'utilisation embarqués et peut ne pas offrir la sécurité et l'évolutivité nécessaires pour des applications à grande échelle.

## Prérequis

Avant de configurer la base de données, assurez-vous que les outils suivants sont installés :

- **SQLite3** : [Télécharger SQLite3](https://www.sqlite.org/download.html)
- **Client SQLite** (optionnel mais recommandé) : Interface en ligne de commande SQLite3 ou tout outil GUI comme [DB Browser for SQLite](https://sqlitebrowser.org/).

## Configuration de la Base de Données

SQLite3 ne nécessite pas de configuration complexe pour la connexion. La base de données est simplement un fichier sur votre système de fichiers, et la connexion se fait en faisant référence au chemin de ce fichier.

### Pas d'Authentification Requise

SQLite3 ne nécessite **pas** de nom d'utilisateur ou de mot de passe pour accéder à la base de données. Il suffit de spécifier le chemin du fichier de base de données, et vous pouvez directement effectuer des requêtes.

### Exemple de Connexion

- **Interface en ligne de commande SQLite** :  
  Pour vous connecter à votre base de données SQLite, ouvrez votre terminal ou invite de commande et utilisez la commande suivante :
  ```bash
  sqlite3 chemin/vers/database.db
  ```

- **Utilisation avec Python** (exemple avec le module `sqlite3`) :
  ```python
  import sqlite3

  conn = sqlite3.connect('chemin/vers/database.db')
  cursor = conn.cursor()

  cursor.execute("SELECT * FROM users")
  rows = cursor.fetchall()
  for row in rows:
      print(row)
  ```

### Développement Local Uniquement

Cette configuration est **uniquement destinée au développement local**. SQLite est idéal pour les petites applications et les tests, mais il manque des fonctionnalités requises pour des systèmes de production avec un trafic élevé ou des besoins en haute concurrence. En production, vous devriez migrer vers un moteur de base de données plus robuste, comme PostgreSQL ou MySQL.

## Description des Tables

Le schéma de la base de données comprend les tables suivantes, chacune étant définie pour stocker différentes informations :

### 1. **QuizzQuestion**
Cette table contient les informations relatives aux questions de quiz.

- `id` (INTEGER) : Identifiant unique de la question.
- `description` (TEXT) : Description de la question.
- `proposition0` à `proposition3` (TEXT) : Les propositions possibles pour la réponse à la question.
- `answer` (INTEGER) : L'indice de la proposition correcte (0 à 3).

### 2. **Intruder**
Cette table contient des mots-clés associés au jeu de l'intrus dans l'application.

- `id` (INTEGER, PRIMARY KEY) : Identifiant unique de l'intrus.
- `keyword` (TEXT) : Le mot-clé correspondant à l'intrus.

### 3. **IntruderImage**
Table qui lie un mot-clé à une image stockée en format binaire (BLOB).

- `id` (INTEGER, PRIMARY KEY) : Identifiant unique.
- `keyword` (TEXT) : Le mot-clé associé à l'image.
- `image` (BLOB) : L'image en format binaire.

### 4. **Tetris**
Cette table semble être utilisée pour enregistrer des configurations ou des résultats du jeu de Tetris.

- `id` (INTEGER, PRIMARY KEY) : Identifiant unique.

### 5. **Game**
Table de gestion des informations relatives aux jeux.

- `id` (INTEGER) : Identifiant du jeu.
- `stand` (TEXT) : Identifiant du stand (peut-être lié à un événement ou une session de jeu).
- `type` (TEXT) : Type de jeu.
- `gameID` (INTEGER) : Identifiant unique du jeu.
- `score` (INTEGER) : Score du joueur.
- `played` (INTEGER) : Nombre de fois que le jeu a été joué.

### 6. **Company**
Table qui contient des informations détaillées sur une entreprise, comme son nom, son slogan, sa description et d'autres attributs.

- `name` (TEXT) : Nom de l'entreprise.
- `stand` (TEXT) : Identifiant du stand associé à l'entreprise.
- `slogan` (TEXT) : Le slogan de l'entreprise.
- `description` (TEXT) : Description de l'entreprise.
- `site` (TEXT) : URL du site web de l'entreprise.
- `logo` (BLOB) : Logo de l'entreprise sous forme binaire.
- `category` (TEXT) : Catégorie de l'entreprise.

### 7. **Stand**
Cette table contient des informations sur les stands dans un espace donné.

- `name` (TEXT) : Nom du stand.
- `map` (TEXT) : Carte ou localisation du stand.
- `x`, `y` (INTEGER) : Coordonnées du stand dans un plan.
- `width`, `height` (INTEGER) : Dimensions du stand.
- `visited` (INTEGER) : Indicateur de si le stand a été visité ou non.

### 8. **Map**
Table utilisée pour stocker les cartes ou les zones associées à un événement ou un jeu.

- `name` (TEXT, PRIMARY KEY) : Nom de la carte ou de la zone.

### 9. **Color**
Cette table contient une liste de couleurs avec leur code hexadécimal.

- `name` (TEXT, PRIMARY KEY) : Nom de la couleur.
- `code` (TEXT) : Code hexadécimal de la couleur.

### 10. **Setup**
Table de configuration de l'application.

- `version` (TEXT) : Version de l'application.
- `updateURL` (TEXT) : URL de mise à jour de l'application.

## Considérations de Sécurité

SQLite3, par sa nature, est une base de données simple basée sur un fichier, et **ne fournit pas de mécanismes d'authentification intégrés**. En raison de cela :

- **Uniquement pour le Développement Local** : Cette configuration est idéale pour le développement local, mais elle ne doit pas être utilisée en environnement de production où la sécurité est un enjeu.
- **Permissions sur le Fichier** : Assurez-vous que le fichier de base de données SQLite dispose des permissions appropriées. Limitez l'accès au fichier à l'utilisateur ou à l'application qui doit le lire/écrire.

> Pour une configuration en production, envisagez d'utiliser un moteur de base de données plus robuste (tel que PostgreSQL, MySQL ou MariaDB), qui prend en charge une authentification complète et des fonctionnalités de sécurité avancées.

## Configuration pour le Développement Local

1. **Installer SQLite3** : Téléchargez et installez SQLite3 depuis [sqlite.org](https://www.sqlite.org/download.html).
2. **Fichier de Base de Données** : Vous pouvez soit créer un nouveau fichier de base de données en vous connectant simplement à celui-ci avec l'outil en ligne de commande SQLite, soit utiliser un fichier `.db` existant.
3. **Importer le Schéma** : Si vous utilisez un schéma préexistant, importez-le avec la commande suivante :
   ```bash
   sqlite3 chemin/vers/database.db < schema.sql
   ```
4. **Tester la Connexion** : Vous pouvez tester la connexion en exécutant des requêtes dans l'interface en ligne de commande SQLite ou via le code de votre application.

## Dépannage

- **Erreur : Impossible de se connecter à la base de données** :
  - Vérifiez que le chemin du fichier de la base de données SQLite est correct.
  - Assurez-vous que le fichier dispose des permissions de lecture/écriture appropriées.

- **Erreur : Table non trouvée** :
  - Assurez-vous d'avoir bien importé le fichier de schéma dans la base de données.
  - Si la table n'existe pas, revérifiez le fichier de schéma ou recréez-le.

## Conclusion

SQLite3 offre une solution rapide et simple pour les bases de données dans les environnements de développement et de test, en particulier lorsque vous avez besoin d'un système autonome et basé sur un fichier. Cependant, elle **n'est pas adaptée aux environnements de production** en raison de l'absence de fonctionnalités robustes en matière de sécurité et d'évolutivité.
