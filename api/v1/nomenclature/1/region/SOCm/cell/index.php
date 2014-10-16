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

	$responseArray[count($responseArray)] = $thisResponse;
}

echo json_encode($responseArray);

?>