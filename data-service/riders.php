<?php
$hostname = "localhost";
$username = "nathan";
$password = "531849";
$db = "nathan";
$sqli = new mysqli($hostname, $username, $password, $db);

$id = FALSE;
if (isset($_GET["id"])) {
    $id = $_GET["id"];
}

if ($id) {
    $query = "SELECT * FROM riders WHERE id = ?";
    $stmt = $sqli->prepare($query);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
} else {
    $query = "SELECT * FROM riders";
    $result = $sqli->query($query);
}

$data = [];

while ($row = $result->fetch_assoc()) {
    $i = count($data);
    foreach ($row as $key => $value) {
        $data[$i][$key] = $value;
    }
}

$json = json_encode($data);
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
print_r($json);

