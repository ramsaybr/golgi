<?php

$link = mysql_connect('localhost', 'usegol5_golgi', 'g9752pikachu') or die("Cannot connect");
mysql_select_db('usegol5_flat');

$region = $_GET['id'];
$q = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE regionID=" . $region));

$response = array();
$response['id'] = $q['regionID'];
$response['name'] = $q['name'];
$response['abbreviation'] = $q['abbreviation'];
$response['X'] = $q['X'];
$response['Y'] = $q['Y'];
$response['width'] = $q['width'];
$response['height'] = $q['height'];
$response['interactionX'] = $q['interactionX'];
$response['interactionY'] = $q['interactionY'];
$response['hasImage'] = $q['hasImage'];

//get history of region activity
$historyQ = mysql_query("SELECT * FROM activity WHERE regionID=" . $q['regionID'] . " ORDER BY dateTime DESC");
$historyArray = array();
while($thisHistory = mysql_fetch_assoc($historyQ))
{
	$userQ = mysql_fetch_assoc(mysql_query("SELECT * FROM user WHERE userID=" . $thisHistory['userID']));
	$thisChange = array();
	$thisChange['fName'] = $userQ['fName'];
	$thisChange['dateTime'] = $thisHistory['dateTime'];
	array_push($historyArray, $thisChange);
}
$response['history'] = $historyArray;

echo json_encode($response);

?>