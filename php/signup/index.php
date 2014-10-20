<?php

	session_start();
	include('../../config/config.php');

	$email = mysql_escape_string($_POST['email']);
	$pwd = mysql_escape_string($_POST['pwd']);

	$response = array();

	//has this user signed up before?
	if(mysql_num_rows(mysql_query("SELECT * FROM golgiUser WHERE email='" . strtolower($email) . "'")) == 0)
	{
		//no. Sign them up!
		$newUserId = sha1(mt_rand() . strtolower($email) . strtolower($pwd));
		if(mysql_query("INSERT INTO `usegol5_flat`.`golgiUser` (`UID`, `email`, `password`, `userID`) VALUES (NULL, '" . strtolower($email) . "', '" . strtolower($pwd) . "', '" . $newUserId . "')"))
		{
			$UID = mysql_insert_id();

			$response['status']=200;
			$cookieDate = 60 * 60 * 24 * 30 + time();
            setcookie('UID', $newUserId, $cookieDate, '/');
            setcookie('email', $email, $cookieDate, '/');
		}
		else
		{
			$response['status']=418;
		}
	}
	else
	{
		//signed up before
		$response['status']=409;
	}

	echo json_encode($response);

?>