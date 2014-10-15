<?php


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


	$responseArray[count($responseArray)] = $thisResponse;
}

echo json_encode($responseArray);

?>