<?php

$recipients = serialize(explode(",", $_POST["recipients"]));
if($_POST["repeats"] == "0"){
    $repeats = 0;
}
else{
    $repeats = 1;
}
$datetime = $_POST["date"] . " " . $_POST["time"] . ":00";


// compare first 16 characters of date, don't care about$current_datetime = date("Y-m-d H:i:s"); seconds.
$current_datetime = date("Y-m-d H:i:s");
echo $current_datetime;
echo strncmp($current_datetime, $datetime, 16);

$username = "root";
$password = "swamp0127";

$db = new PDO("mysql:host=localhost;dbname=mindy", $username, $password,
        array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
$stmt = $db->prepare("INSERT INTO emails(name,recipients,body,date,repeats,repeat_interval)
                VALUES(:name,:recipients,:body,:date,:repeats,:repeat_interval);");
$stmt->bindValue(":name", $_POST["name"], PDO::PARAM_STR);
$stmt->bindValue(":recipients", $recipients, PDO::PARAM_LOB);
$stmt->bindValue(":body", $_POST["body"], PDO::PARAM_STR);
$stmt->bindValue(":date", $datetime, PDO::PARAM_STR);
$stmt->bindValue(":repeats", $_POST["repeats"], PDO::PARAM_INT);
$stmt->bindValue(":repeat_interval", $_POST["interval"], PDO::PARAM_STR);
$stmt->execute();

?>