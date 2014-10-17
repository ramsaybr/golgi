<?php

session_start();
include("../asset/config.php");

$responseArray = array();

//get region from database
//do this by parsing path
$pathArray = explode("/", dirname(__FILE__));
$regionQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation = '" . $pathArray[count($pathArray)-1] . "'"));

$responseArray['type'] = "Region";
$responseArray['bamsID'] = $regionQuery['regionID'];
$responseArray['name'] = $regionQuery['name'];
$responseArray['abbreviation'] = $regionQuery['abbreviation'];
$responseArray['otherNomenclatures'] = 0;
$responseArray['dataSets'] = array('connections');
$responseArray['coordinatePlot'] = array($regionQuery['X'],$regionQuery['Y']);
$responseArray['dimensions'] = array($regionQuery['width'],$regionQuery['height']);
$responseArray['coordinateInteraction'] = array($regionQuery['interactionX'],$regionQuery['interactionY']);


//find nomenclature
$nomenclatureQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM nomenclature WHERE nomenclatureID = " . $regionQuery['nomenclatureID']));
//find species
$speciesQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM species WHERE speciesID = " . $nomenclatureQuery['speciesID']));
$responseArray['nomenclature'] = $nomenclatureQuery['name'];
$responseArray['species'] = $speciesQuery['name'];

//find notes this user has if user is logged in
$responseArray['notes'] = array();
if(isset($_COOKIE['UID']))
{
	if($_COOKIE['UID'] != "")
	{
		//user is logged in. find notes
		$notesQuery = mysql_query("SELECT * FROM note WHERE UID='" . $_COOKIE['UID'] . "' AND itemType=1 AND itemID=" . $responseArray['bamsID'] . " ORDER BY dateTime DESC");
		while($thisNote = mysql_fetch_assoc($notesQuery))
		{
			$newNote = array();
			$newNote['id'] = $thisNote['id'];
			$newNote['UID'] = $thisNote['UID'];
			$newNote['itemType'] = $thisNote['itemType'];
			$newNote['itemID'] = $thisNote['itemID'];
			$newNote['note'] = $thisNote['note'];
			$newNote['dateTime'] = $thisNote['dateTime'];

			array_push($responseArray['notes'], $newNote);
		}
	}
}

$responseArray['destination'] = "searchResults";
$responseArray['otherLayers'] = false;

echo json_encode($responseArray);

?>