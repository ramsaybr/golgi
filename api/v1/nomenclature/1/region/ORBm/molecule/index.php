<?php

session_start();

include("../../asset/config.php");

$pathArray = explode("/", dirname(__FILE__));
$regionQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation = '" . $pathArray[count($pathArray)-2] . "'"));

$moleculeQuery = mysql_query("SELECT * FROM molecule WHERE regionID='" . $regionQuery['regionID'] . "'");

$responseArray = array();

while($thisMolecule = mysql_fetch_array($moleculeQuery))
{

	//find this connection
	$thisResponse = array();
	$thisResponse['type'] = "Molecule";
	$thisResponse['bamsID'] = $thisMolecule['moleculeID'];
	$thisResponse['name'] = $thisMolecule['name'];
	$thisResponse['regionID'] = $thisMolecule['regionID'];
	$thisResponse['regionName'] = $thisMolecule['regionName'];
	$thisResponse['regionAbbrev'] = $thisMolecule['regionAbbrev'];
	$thisResponse['distribution'] = $thisMolecule['distribution'];
	$thisResponse['strength'] = $thisMolecule['strength'];
	$thisResponse['annotation'] = $thisMolecule['annotation'];
	$thisResponse['referenceName'] = $thisMolecule['referenceName'];
	$thisResponse['referenceURL'] = $thisMolecule['referenceURL'];
	$thisResponse['detailsURL'] = $thisMolecule['detailsURL'];

	//find notes this user has if user is logged in
	$thisResponse['notes'] = array();
	if(isset($_COOKIE['UID']))
	{
		if($_COOKIE['UID'] != "")
		{
			//user is logged in. find notes
			//get real UID first
			$UIDQ = mysql_fetch_assoc(mysql_query("SELECT * FROM golgiUser WHERE userID='" . $_COOKIE['UID'] . "'"));
			$UID = $UIDQ['UID'];
			$notesQuery = mysql_query("SELECT * FROM note WHERE UID='" . $UID . "' AND itemType=3 AND itemID=" . $thisResponse['bamsID'] . " ORDER BY dateTime DESC");
			while($thisNote = mysql_fetch_assoc($notesQuery))
			{
				$newNote = array();
				$newNote['id'] = $thisNote['id'];
				$newNote['UID'] = $thisNote['UID'];
				$newNote['itemType'] = $thisNote['itemType'];
				$newNote['itemID'] = $thisNote['itemID'];
				$newNote['note'] = $thisNote['note'];
				$newNote['dateTime'] = $thisNote['dateTime'];

				array_push($thisResponse['notes'], $newNote);
			}
		}
	}

	$responseArray[count($responseArray)] = $thisResponse;
}

echo json_encode($responseArray);

?>