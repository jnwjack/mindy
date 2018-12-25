<?php
// kill script after 1 minute
set_time_limit(60);

date_default_timezone_set("EST");
$current_datetime = date("Y-m-d H:i:s");
// Get current time, ommitting seconds
$current_datetime = substr($current_datetime, 0, 17) . "00";

require_once "Mail.php";

$username = "root";
$password = "swamp0127";
$db = new PDO("mysql:host=localhost;dbname=mindy", $username, $password,
        array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
$stmt = $db->prepare("SELECT * FROM emails WHERE date=:datetime");
$stmt->bindValue(":datetime", $current_datetime, PDO::PARAM_STR);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

$smtp = Mail::factory('smtp', array(
    'host' => 'smtp.gmail.com',
    'port' => '587',
    'auth' => true,
    'username' => 'mindymailapp@gmail.com',
    'password' => 'stripe0127'
));

foreach($rows as $row){
    $recipients = unserialize($row["recipients"]);
    $from = 'mindymailapp@gmail.com';
    $subject = "Email alert from ". $row["name"];
    $body = $row["body"];
    
    foreach($recipients as $to){
        $headers = array(
            'From' => $from,
            'To' => $to,
            'Subject' => $subject
        );
        $mail = $smtp->send($to, $headers, $body);
    }

    if($row["repeats"] > 0){
        echo "repeats";
    }
}
?>