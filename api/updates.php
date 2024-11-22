<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lh_test_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$table = $_GET['table'];

switch ($method) {
    case 'GET':
        if (isset($_GET['version'])) {
            $version = $_GET['version'];
            $sql = "SELECT data FROM Version WHERE version > '$version' ORDER BY version ASC";
            $result = $conn->query($sql);
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = json_decode($row['data'], true);
            }
            echo json_encode($data);
        } else {
            $sql = "SELECT * FROM $table";
            $result = $conn->query($sql);
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $columns = implode(", ", array_keys($input));
        $values = implode("', '", array_values($input));
        $sql = "INSERT INTO $table ($columns) VALUES ('$values')";
        if ($conn->query($sql) === TRUE) {
            $input['id'] = $conn->insert_id;
            echo json_encode($input);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    case 'PUT':
        $id = $_GET['id'];
        $input = json_decode(file_get_contents('php://input'), true);
        $updates = [];
        foreach ($input as $key => $value) {
            $updates[] = "$key='$value'";
        }
        $updates_str = implode(", ", $updates);
        $sql = "UPDATE $table SET $updates_str WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode($input);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM $table WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    default:
        echo json_encode(['status' => 'method not allowed']);
        break;
}

$conn->close();
?>