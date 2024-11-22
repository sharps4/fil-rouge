<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['version'])) {
            $version = $_GET['version'];
            $versionFile = "api/version_$version.json";
            if (file_exists($versionFile)) {
                $data = file_get_contents($versionFile);
                echo $data;
            } else {
                echo json_encode([]);
            }
        } else {
            echo json_encode(['error' => 'Version not specified']);
        }
        break;

    default:
        echo json_encode(['status' => 'method not allowed']);
        break;
}
?>