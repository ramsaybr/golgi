<?php

	session_start();
	include('../../../config/config.php');

	$email = mysql_escape_string($_POST['email']);
	$pwd = mysql_escape_string($_POST['pwd']);

	$response = array();

	//has this user signed up before?

	$query = mysql_query("SELECT * FROM golgiUser WHERE email='" . strtolower($email) . "' AND password='" . strtolower($pwd) . "'");
	if(mysql_num_rows($query) == 1)
	{
		$result = mysql_fetch_assoc($query);
		$response['status']=200;
		$cookieDate = 60 * 60 * 24 * 30 + time();
        setcookie('UID', $result['userID'], $cookieDate, '/');
        setcookie('email', $email, $cookieDate, '/');
	}
	else
	{
		//signed up before
		$response['status']=403;
	}

	echo json_encode($response);

?>