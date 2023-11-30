<?php
$hostname = "localhost";
$username = "nathan";
$password = "531849";
$db = "nathan";
$mysqli = new mysqli($hostname, $username, $password, $db);

// Check the connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// validate form data
function validate_data() {
    // TODO
}