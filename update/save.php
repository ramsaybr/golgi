<?php

session_start();
$uID = 0;
if(isset($_SESSION['uID']))
{
	//logged in with session
	$uID = $_SESSION['uID'];
}
else if(isset($_COOKIE['uID']))
{
	$uID = $_COOKIE['uID'];
}

$link = mysql_connect('localhost', 'usegol5_golgi', 'g9752pikachu') or die("Cannot connect");
mysql_select_db('usegol5_flat');

$newData = json_decode($_GET['j']);

//check for differences to determine points
$sameQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE regionID='" . (int)$newData->{'id'} . "'"));
$score = 0;
if($sameQ['interactionX'] != $newData->{'interactionX'} && $newData->{'interactionX'} != " ")
{
	$score++;
}
if($sameQ['interactionY'] != $newData->{'interactionY'} && $newData->{'interactionY'} != " ")
{
	$score++;
}
if($sameQ['X'] != $newData->{'X'} && $newData->{'X'} != " ")
{
	$score++;
}
if($sameQ['Y'] != $newData->{'Y'} && $newData->{'Y'} != " ")
{
	$score++;
}
if($sameQ['width'] != $newData->{'width'} && $newData->{'width'} != " ")
{
	$score++;
}
if($sameQ['height'] != $newData->{'height'} && $newData->{'height'} != " ")
{
	$score++;
}
if($score == 6)
{
	$score = $score+2;
}

//leave record in activity log
mysql_query("INSERT INTO `usegol5_flat`.`activity` (`id`, `userID`, `regionID`, `oldX`, `newX`, `oldY`, `newY`, `oldWidth`, `newWidth`, `oldHeight`, `newHeight`, `oldIntX`, `newIntX`, `oldIntY`, `newIntY`, `dateTime`) VALUES (NULL, '" . $uID . "', '" . (int)$newData->{'id'} . "', '" . $sameQ['X'] . "', '" . (int)$newData->{'X'} . "', '" . $sameQ['Y'] . "', '" . (int)$newData->{'Y'} . "', '" . $sameQ['width'] . "', '" . (int)$newData->{'width'} . "', '" . $sameQ['height'] . "', '" . (int)$newData->{'height'} . "', '" . $sameQ['interactionX'] . "', '" . (int)$newData->{'interactionX'} . "', '" . $sameQ['interactionY'] . "', '" . (int)$newData->{'interactionY'} . "', NOW())")or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error());

//find current score
$scoreQ = mysql_fetch_assoc(mysql_query("SELECT * FROM points WHERE userID=" . $uID));
$newScore = ($score * 10) + $scoreQ['points'];
//save new score
mysql_query("UPDATE points SET points=" . $newScore . " WHERE userID='" . $uID . "'");


//update region
mysql_query("UPDATE region SET X=" . (float)$newData->{'X'} . " WHERE regionID='" . (int)$newData->{'id'} . "'");
mysql_query("UPDATE region SET Y=" . (float)$newData->{'Y'} . " WHERE regionID='" . (int)$newData->{'id'} . "'");
mysql_query("UPDATE region SET width=" . (float)$newData->{'width'} . " WHERE regionID='" . (int)$newData->{'id'} . "'");
mysql_query("UPDATE region SET height=" . (float)$newData->{'height'} . " WHERE regionID='" . (int)$newData->{'id'} . "'");
mysql_query("UPDATE region SET interactionX=" . (float)$newData->{'interactionX'} . " WHERE regionID='" . (int)$newData->{'id'} . "'");
mysql_query("UPDATE region SET interactionY=" . (float)$newData->{'interactionY'} . " WHERE regionID='" . (int)$newData->{'id'} . "'");



//check completion
$completion = 0;
$completionQ = mysql_query("SELECT * FROM region");
while($thisCompletion = mysql_fetch_assoc($completionQ))
{
	if($thisCompletion['X'] != 0 && $thisCompletion['X'] != NULL)
	{
		$completion++;
	}
	if($thisCompletion['Y'] != 0 && $thisCompletion['Y'] != NULL)
	{
		$completion++;
	}
	if($thisCompletion['interactionY'] != 0 && $thisCompletion['interactionY'] != NULL)
	{
		$completion++;
	}
	if($thisCompletion['interactionX'] != 0 && $thisCompletion['interactionX'] != NULL)
	{
		$completion++;
	}
	if($thisCompletion['width'] != 0 && $thisCompletion['width'] != NULL)
	{
		$completion++;
	}
	if($thisCompletion['height'] != 0 && $thisCompletion['height'] != NULL)
	{
		$completion++;
	}
}


$response = array();
$response['scoreChange'] = $score;
$response['score'] = $newScore;
$response['completion'] = (($completion/5772)*100);
echo json_encode($response);
?>