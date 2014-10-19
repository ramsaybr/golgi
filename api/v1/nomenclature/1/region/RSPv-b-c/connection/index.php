<?php


include("../../asset/config.php");

$pathArray = explode("/", dirname(__FILE__));
$regionQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation = '" . $pathArray[count($pathArray)-2] . "'"));

$connectionQuery = mysql_query("SELECT * FROM connection WHERE targetID='" . $regionQuery['regionID'] . "' OR sourceID='" . $regionQuery['regionID'] . "'");

$responseArray = array();

while($thisConnection = mysql_fetch_array($connectionQuery))
{
	//find this connection
	$thisResponse = array();
	$thisResponse['type'] = "Connection";
	$thisResponse['bamsID'] = $thisConnection['connectionID'];
	$thisResponse['sourceID'] = $thisConnection['sourceID'];
	$thisResponse['targetID'] = $thisConnection['targetID'];
	
	//find names of sources, targets
	$sourceQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE regionID='" . $thisConnection['sourceID'] . "'"));
	$targetQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE regionID='" . $thisConnection['targetID'] . "'"));
	$nomenclatureQ = mysql_fetch_assoc(mysql_query("SELECT * FROM nomenclature WHERE nomenclatureID = '" . $thisConnection['nomenclatureID'] . "'"));
	$speciesQ = mysql_fetch_assoc(mysql_query("SELECT * FROM species WHERE speciesID = '" . $thisConnection['speciesID'] . "'"));

	$thisResponse['sourceName'] = $sourceQ['name'];
	$thisResponse['sourceAbbrev'] = $sourceQ['abbreviation'];
	$thisResponse['targetName'] = $targetQ['name'];
	$thisResponse['targetAbbrev'] = $targetQ['abbreviation'];
	$thisResponse['species'] = $speciesQ['name'];
	$thisResponse['nomenclature'] = $nomenclatureQ['name'];
	$thisResponse['dimensions'] = array($thisConnection['width'], $thisConnection['height']);
	$thisResponse['coordinatePlot'] = array($thisConnection['X'], $thisConnection['Y']);
	$thisResponse['destination'] = "searchResults";
	$thisResponse['otherLayers'] = false;
	

	//find all evidence for this connection

	$thisResponse['evidence'] = array();
	$evidenceQ = mysql_query("SELECT * FROM connectionReport WHERE connectionID='" . $thisConnection['connectionID'] . "'");
	while($thisReport = mysql_fetch_assoc($evidenceQ))
	{
		$report = array();
		$report['connectionReportID'] = $thisReport['connectionReportID'];
		$report['connectionID'] = $thisReport['connectionID'];
		
		//find strength, technique, injection location, terminal field locations
		$report['strengthID'] = $thisReport['strengthID'];
		$report['techniqueID'] = $thisReport['techniqueID'];	
		$report['injectionSiteID'] = $thisReport['injectionSiteID'];
		$report['terminalFieldID'] = $thisReport['terminalFieldID'];

		//find reference, curator
		$report['annotation'] = $thisReport['annotation'];
		$report['referenceName'] = $thisReport['referenceName'];
		$report['referenceURL'] = $thisReport['referenceURL'];
		$report['detailsURL'] = $thisReport['detailsURL'];

		$thisResponse['evidence'][count($thisResponse['evidence'])] = $report;
	}

	//find notes this user has if user is logged in
	$thisResponse['notes'] = array();
	if(isset($_COOKIE['UID']))
	{
		if($_COOKIE['UID'] != "")
		{
			//user is logged in. find notes
			$notesQuery = mysql_query("SELECT * FROM note WHERE UID='" . $_COOKIE['UID'] . "' AND itemType=2 AND itemID=" . $thisResponse['bamsID'] . " ORDER BY dateTime DESC");
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