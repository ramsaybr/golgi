<?php


include("../../asset/config.php");

$pathArray = explode("/", dirname(__FILE__));
$regionQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation = '" . $pathArray[count($pathArray)-2] . "'"));

$cellQuery = mysql_query("SELECT * FROM cell WHERE regionID='" . $regionQuery['regionID'] . "'");

$responseArray = array();

while($thisCell = mysql_fetch_array($cellQuery))
{

	//find this connection
	$thisResponse = array();
	$thisResponse['type'] = "Cell";
	$thisResponse['bamsID'] = $thisCell['cellID'];
	$thisResponse['name'] = $thisCell['name'];
	$thisResponse['regionID'] = $thisCell['regionID'];
	$thisResponse['regionName'] = $thisCell['regionName'];
	$thisResponse['regionAbbrev'] = $thisCell['regionAbbrev'];
	$thisResponse['detailsURL'] = $thisCell['detailsURL'];

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
			$notesQuery = mysql_query("SELECT * FROM note WHERE UID='" . $UID . "' AND itemType=4 AND itemID=" . $thisResponse['bamsID'] . " ORDER BY dateTime DESC");
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