<?php
    // comma-separated string, can parse easiliy
    $recipients = explode(",", $_POST["recipients"]);

    echo $_POST["name"];
    
    require_once "Mail.php";

    $from = 'mindymailapp@gmail.com';
    $subject = "Email alert from ". $_POST["name"];
    $body = $_POST["body"];

    
    $smtp = Mail::factory('smtp', array(
    	'host' => 'smtp.gmail.com',
	    'port' => '587',
	    'auth' => true,
	    'username' => 'mindymailapp@gmail.com',
	    'password' => 'stripe0127'
    ));

    foreach($recipients as $to){
        $headers = array(
         'From' => $from,
	     'To' => $to,
	     'Subject' => $subject
        );
        $mail = $smtp->send($to, $headers, $body);
        if(PEAR::isError($mail)){
	       echo('<p>' . $mail->getMessage() . '</p>');
        } else{
	       echo('<p>Message successfully sent!</p>');
        }
    }
?>