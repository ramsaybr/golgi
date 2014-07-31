<?php


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
$responseArray['notes'] = "My notes from the last experiment";

//find nomenclature
$nomenclatureQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM nomenclature WHERE nomenclatureID = " . $regionQuery['nomenclatureID']));
//find species
$speciesQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM species WHERE speciesID = " . $nomenclatureQuery['speciesID']));
$responseArray['nomenclature'] = $nomenclatureQuery['name'];
$responseArray['species'] = $speciesQuery['name'];

$responseArray['destination'] = "searchResults";
$responseArray['otherLayers'] = false;


echo json_encode($responseArray);

?>