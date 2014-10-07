<?php

	//dev
	$link = mysql_connect('localhost', 'root', 'root') or die("Cannot connect");
	mysql_select_db('rootle5_flat');
	//prod
	// $link = mysql_connect('localhost', 'usegol5_golgi', 'g9752pikachu') or die("Cannot connect");
	// mysql_select_db('usegol5_flat');
	
?>