<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<?= BASE_URI ?>/assets/img/icon.png">
    <link rel="stylesheet" href="<?= BASE_URI ?>/assets/css/global.css">
    <title>L'Appli LH Port Days</title>
</head>
<body>
    <main>
        <section>
            <h1>L'application a été téléchargée <?= intval(file_get_contents(ROOT_PATH.'/data/download-count.txt')) ?> fois</h1>
        </section>
    </main>
</body>
</html>