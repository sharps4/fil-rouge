[![License](https://img.shields.io/github/license/sharps4/fil-rouge)](https://github.com/sharps4/fil-rouge/LICENSE)

# API

API pour mettre à jour la base de données sur le serveur.

> [!IMPORTANT]
> C'est en WIP donc tout n'est pas complet pour le moment.

## Utilisation/Test

Pour tester : utilisation de curl

```bash
curl -X GET http://localhost/updates.php

curl -X POST http://localhost/updates.php -H "Content-Type: application/json" -d '{"title": "Nouvelle mise à jour", "description": "Description de la mise à jour"}'

curl -X PUT http://localhost/updates.php?id=1 -H "Content-Type: application/json" -d '{"title": "Mise à jour modifiée", "description": "Description modifiée"}'

curl -X DELETE http://localhost/updates.php?id=1
```

## Licence

This project is licensed under the GPL-3.0 License.