<?php

	session_start();
	include('../../../config/config.php');

	$originalPwd = mysql_escape_string($_POST['originalPwd']);
	$newPwd = mysql_escape_string($_POST['newPwd']);

	$response = array();

	//has this user signed up before?

	$query = mysql_query("SELECT * FROM golgiUser WHERE UID='" . mysql_escape_string($_COOKIE['UID']) . "' AND password='" . strtolower($originalPwd) . "'");
	if(mysql_num_rows($query) == 1)
	{
		if(mysql_query("UPDATE golgiUser SET password='" . strtolower($newPwd) . "' WHERE `UID` = '" . $_COOKIE['UID'] . "'"))
		{
			$response['status'] = 200;
		}
		else
		{
			$response['status'] = 418;
		}
	}
	else
	{
		//signed up before
		$response['status'] = 418;
	}
	

	echo json_encode($response);

?>