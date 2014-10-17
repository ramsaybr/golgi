<?php

	session_start();

	setcookie("UID", "", time()-3600, '/');
	setcookie("email", "", time()-3600, '/');

	$response = array();
	$response['status'] = 200;

	echo json_encode($response);

?>