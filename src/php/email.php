<?php
    // common-separated string, can parse easiliy
    echo $_POST['recipients'];

    require_once "Mail.php";

    $from = 'mindymailapp@gmail.com';
    $to = "john.wohl@uconn.edu";
    $subject = "Hi!";
    $body = "Hey bud.";
    
    $headers = array(
    	     'From' => $from,
	     'To' => $to,
	     'Subject' => $subject
    );
    
    $smtp = Mail::factory('smtp', array(
    	'host' => 'smtp.gmail.com',
	    'port' => '537',
	    'auth' => true,
	    'username' => 'mindymailapp@gmail.com',
	    'password' => 'stripe0127'
    ));

    $mail = $smpt->send($to, $headers, $body);
    if(PEAR::isError($mail)){
	echo('<p>' . $mail.getMessage() . '</p>');
    } else{
	echo('<p>Message successfully sent!</p>');
    }
?>