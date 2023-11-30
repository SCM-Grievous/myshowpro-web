<?php

$show_id = FALSE;

if ($_GET["showId"]) {
   $show_id = $_GET["showId"];
}

if (($handle = fopen("rings.csv", "r")) !== FALSE) {
    $csvs = [];
    while(! feof($handle)) {
       $csvs[] = fgetcsv($handle);
    }
    $datas = [];
    $column_names = [];
    $column_ids = [];    // reverse map
    foreach ($csvs[0] as $single_csv) {
	    $column_ids[$single_csv] = count($column_names);
        $column_names[] = $single_csv;
    }

    foreach ($csvs as $key => $csv) {
        if ($key == 0 || !$csv) {
            continue;
        }
	
	if ($show_id && !($show_id == $csv[$column_ids["showId"]])) {    // check for id
	   continue;
	}

	$i = count($datas);
        foreach ($column_names as $column_key => $column_name) {
            $datas[$i][$column_name] = $csv[$column_key];
        }

    }
    $json = json_encode($datas);
    fclose($handle);
    header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
    print_r($json);
}