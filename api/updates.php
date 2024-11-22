<?php
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $files = glob('api/version_*.json');
        if ($files) {
            $versions = array_map(function($file) {
                return (int)str_replace(['api/version_', '.json'], '', $file);
            }, $files);
            rsort($versions);
            $latestVersion = $versions[0];
            $latestVersionFile = "api/version_$latestVersion.json";
            if (file_exists($latestVersionFile)) {
                $data = file_get_contents($latestVersionFile);
                echo $data;
            } else {
                echo json_encode([]);
            }
        } else {
            echo json_encode(['error' => 'No versions available']);
        }
        break;

    default:
        echo json_encode(['status' => 'method not allowed']);
        break;
}
?>