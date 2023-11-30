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

// Function to validate form data (NEED MUCH MORE VALIDATION HERE)
function validate_data() {
    if (!isset($_POST["title"])) {
        return "Name field is required.";
    }

    if (!isset($_POST["venue"])) {
        return "Venue field is required";
    }

    if (!isset($_POST["startDate"])) {
        return "Start date field is required";
    }

    if (!isset($_POST["endDate"])) {
        return "End date field is required";
    }

    if (!isset($_POST["location"])) {
        return "Location field is required";
    }

    if (!isset($_POST["description"])) {
        return "Description field is required";
    }

    return 0; // Validation passed
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate form data
    $validation_result = validate_data();

    if ($validation_result === 0) {
        // Construct prepared statement
        $stmt = $mysqli->prepare("INSERT INTO shows (title, venue, startDate, endDate, status, lastUpdated, location, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");


        // UNFINISHED --- TO DO
        $title = $_POST["title"];
        $venue = $_POST["venue"];
        $startDate = $_POST["startDate"];
        $endDate = $_POST["endDate"];
        $lastUpdated = date('Y-m-d h:i:s', time());

        if ($startDate > $lastUpdated) {
            $status = 1;
        } elseif ($endDate < $lastUpdated) {
            $status = 2;
        } else {
            $status = 0;
        }

        $location = $_POST["location"];
        $description = $_POST["description"];

        // Bind parameters
        $stmt->bind_param("ssssisss", $title, $venue, $startDate, $endDate, $status, $lastUpdated, $location, $description);

        // Execute the statement
        if ($stmt->execute()) {
            header("Location: http://10.16.14.104/~nathan/cp5/account.html");
            die();
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        // Validation failed, return error message
        echo $validation_result;
    }

    // Close the database connection
    $mysqli->close();
}
?>
