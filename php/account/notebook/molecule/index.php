<?php
	session_start();

	if(isset($_COOKIE['UID']))
	{
		if($_COOKIE['UID'] != "")
		{
			include('../../../../config/config.php');
			$note = mysql_escape_string($_POST['note']);
			$itemID = mysql_escape_string($_POST['itemID']);
			$UID = mysql_escape_string($_COOKIE['UID']);
			$response = array();
			if(mysql_query("INSERT INTO `rootle5_flat`.`note` (`id`, `UID`, `itemType`, `itemID`, `note`, `dateTime`) VALUES (NULL, $UID, 3, $itemID, '" . $note . "', NOW())")or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
			{
				//get dateTime. Query inserted
				$timeQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM note WHERE id=" . mysql_insert_id()));
				$response['status']=200;
				$response['noteID'] = mysql_insert_id();
				$response['UID'] = $_COOKIE['UID'];
				$response['dateTime'] = $timeQuery['dateTime'];
			}
			else
			{
				$response['status']=418;
			}
		}
	}
	
	echo json_encode($response);

?>