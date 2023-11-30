<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Read the JSON data from the request body
    $json = file_get_contents("php://input");

    // Convert JSON to an associative array
    $data = json_decode($json, true);

    if ($data) {
        // Open the CSV file in append mode
        $csvFile = 'data.csv';
        $file = fopen($csvFile, 'a');

        if ($file) {
            // Lock the file for writing
            flock($file, LOCK_EX);

            // Get the CSV headers from the first row
            $headers = fgetcsv(fopen($csvFile, 'r'));

            // Create a new row from the JSON data, matching keys to headers
            $newRow = [];
            foreach ($headers as $header) {
                if (isset($data[$header])) {
                    $newRow[] = $data[$header];
                } else {
                    $newRow[] = '';
                }
            }

            // Append the new row to the CSV file
            fputcsv($file, $newRow);

            // Release the lock and close the file
            flock($file, LOCK_UN);
            fclose($file);

            echo "Data added to CSV successfully.";
        } else {
            echo "Failed to open the CSV file for writing.";
        }
    } else {
        echo "Invalid JSON data in the request.";
    }
} else {
    header("HTTP/1.1 405 Method Not Allowed");
    echo "Only PUT requests are allowed.";
}



