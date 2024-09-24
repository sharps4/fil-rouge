<?php
    define('BASE_URI', '');
    define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
    // define('BASE_URI', 'http://localhost/lhportdays');
    // define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT'].'/lhportdays');

    switch ($_SERVER['PATH_INFO'] ?? '/')
    {
        case '/':
        {
            require(ROOT_PATH.'/app/home.php');
            break;
        }
        case '/new-download':
        {
            $n = intval(file_get_contents(ROOT_PATH.'/data/download-count.txt'));
            file_put_contents(ROOT_PATH.'/data/download-count.txt', $n+1);
            echo 'Ok';
            break;
        }
        case '/counter':
        {
            require(ROOT_PATH.'/app/counter.php');
            break;
        }
        default:
        {
            require(ROOT_PATH.'/app/error404.php');
            break;
        }
    }
?>