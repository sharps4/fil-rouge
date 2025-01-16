[![License](https://img.shields.io/github/license/sharps4/fil-rouge)](https://github.com/sharps4/fil-rouge/LICENSE)

# API

API pour mettre à jour la base de données sur le serveur.

> [!IMPORTANT]
> C'est en WIP donc tout n'est pas complet pour le moment. Les url dans utilisation sont des placeholder (à modifier avant de test) !

## Utilisation/Test

Pour tester : utilisation de curl

```bash
curl -X GET "http://localhost/updates.php?table=Company"

curl -X POST -H "Content-Type: application/json" -d '{"name":"New Company","stand":"Stand1","description":"A new company","site":"http://example.com","logo":null,"activitySector":"Tech"}' "http://localhost/updates.php?table=Company"

curl -X PUT -H "Content-Type: application/json" -d '{"name":"Updated Company","stand":"Stand1","description":"An updated company","site":"http://example.com","logo":null,"activitySector":"Tech"}' "http://localhost/updates.php?table=Company&id=1"

curl -X POST -H "Content-Type: application/json" -d '["Company", "Stand"]' "http://localhost/updates.php?table=SYNC"
```

## Licence

This project is licensed under the GPL-3.0 License.
