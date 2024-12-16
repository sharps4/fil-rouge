<?php
    header('Content-Type: application/json');

    switch ($_SERVER['REQUEST_METHOD'])
    {
        case 'GET':
            if (array_key_exists('version', $_GET))
            {
                $files = scandir('./requests', SCANDIR_SORT_DESCENDING);
                if (count($files) > 0)
                {
                    $version = substr($files[0], 1, -5);
                    if ($version !== $_GET['version'])
                    {
                        echo json_encode([
                            'status'   => 'new-version',
                            'version'  => $version,
                            'requests' => json_decode(file_get_contents('./requests/'.$files[0]))
                        ]);
                        break;
                    }
                }
            }
            echo json_encode(['status' => 'up-to-date']);
            break;

        default:
            echo json_encode(['status' => 'method not allowed']);
            break;
    }
?>