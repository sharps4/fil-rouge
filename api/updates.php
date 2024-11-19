<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM updates";
        $result = $conn->query($sql);
        $updates = [];
        while($row = $result->fetch_assoc()) {
            $updates[] = $row;
        }
        echo json_encode($updates);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $sql = "INSERT INTO updates (title, description) VALUES ('" . $input['title'] . "', '" . $input['description'] . "')";
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
        $sql = "UPDATE updates SET title='" . $input['title'] . "', description='" . $input['description'] . "' WHERE id=" . $id;
        if ($conn->query($sql) === TRUE) {
            echo json_encode($input);
        } else {
            echo json_encode(['error' => $conn->error]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $sql = "DELETE FROM updates WHERE id=" . $id;
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