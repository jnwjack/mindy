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
        $new_repeats = $row["repeats"] - 1;

        $date_and_time = explode(" ", $row["date"]);
        $date_array = explode("-", $date_and_time[0]);
        $year = $date_array[0];
        $month = $date_array[1];
        $day = $date_array[2];

        //TODO: Refactor this, write function for handling month updates, etc.

        if($row["repeat_interval"] == "Daily"){
            if($day == 31 || ($day == 30 && in_array($month, [4, 6, 9, 11]) || ($day == 28 && $month == 2))){
                $day = 1;
                if($month == 12){
                    $month = 1;
                    $year += 1;
                }
                else{
                    $month += 1;
                }
            }
            else{
                $day++;
            }
        }

        elseif($row["repeat_interval"] == "Weekly") {
            if($day >= 25 || ($day >= 24 && in_array($month, [4, 6, 9, 11]) || ($day == 22 && $month == 2))){
                if(in_array($month, [4, 6, 9, 11])){
                    $day = 7 - (30 - $day);
                }
                elseif($month == 2){
                    $day = 7 - (28 - $day);
                }
                else{
                    $day = 7 - (31 - $day);
                }
                if($month == 12){
                    $month = 1;
                    $year++;
                }
                else{
                    $month += 1;
                }
            }
            else{
                $day += 7;
            }
        }

        elseif($row["repeat_interval"] == "Monthly"){
            if($month == 12){
                $month = 1;
                $year++;
            }
            else{
                $month++;
            }
    
            if($month == 2 && $day > 28){
                $day = 28; 
            }
            elseif(in_array($month, [4, 6, 9, 11]) && $day == 31){
                $day = 30;
            }
        }

        $new_datetime = sprintf("%d-%d-%d %s", $year, $month, $day, $date_and_time[1]);

        $update = $db->prepare("UPDATE emails SET repeats=:new_repeats, date=:datetime WHERE id=:id");
        $update->bindValue(":new_repeats", $new_repeats, PDO::PARAM_INT);
        $update->bindValue(":id", $row["id"], PDO::PARAM_INT);
        $update->bindValue(":datetime", $new_datetime, PDO::PARAM_STR);
        $update->execute();
    }
    else{
        $del = $db->prepare("DELETE FROM emails WHERE id=:id");
        $del->bindValue(":id", $row["id"], PDO::PARAM_INT);
        $del->execute();
    }
}
?>