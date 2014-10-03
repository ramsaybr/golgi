<?php


include("../../asset/config.php");
// $link = mysql_connect('localhost', 'rootle5_flatUser', 'flat9752pikachu') or die("Cannot connect");
// mysql_select_db('rootle5_flat');

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
	$thisResponse['notes'] = "My notes from the last experiment";
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
		$strengthQ = mysql_fetch_assoc(mysql_query("SELECT * FROM strength WHERE strengthID='" . $thisReport['strengthID'] . "'"));
		$report['strength'] = $strengthQ['value'];
		$techniqueQ = mysql_fetch_assoc(mysql_query("SELECT * FROM technique WHERE techniqueID='" . $thisReport['techniqueID'] . "'"));
		$report['technique'] = $techniqueQ['name'];

		$injectionSiteQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE regionID = '" . $thisReport['injectionLocationID'] . "'"));
		$report['injectionSiteID'] = $injectionSiteQ['regionID'];
		$report['injectionSiteName'] = $injectionSiteQ['name'];
		$report['injectionSiteAbbrev'] = $injectionSiteQ['abbreviation'];

		$injectionSiteQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE regionID = '" . $thisReport['terminalFieldID'] . "'"));
		$report['terminalFieldID'] = $injectionSiteQ['regionID'];
		$report['terminalFieldName'] = $injectionSiteQ['name'];
		$report['terminalFieldAbbrev'] = $injectionSiteQ['abbreviation'];

		$report['annotation'] = $thisReport['annotation'];

		//find reference, curator
		$referenceQ = mysql_fetch_assoc(mysql_query("SELECT * FROM reference WHERE referenceID='" . $thisReport['referenceID'] . "'"));
		$report['referenceName'] = $referenceQ['name'];
		$report['referenceAuthors'] = $referenceQ['authors'];
		$report['referenceURL'] = $referenceQ['url'];

		$referenceQ = mysql_fetch_assoc(mysql_query("SELECT * FROM curator WHERE curatorID='" . $thisReport['curatorID'] . "'"));
		$report['curatorName'] = $referenceQ['name'];
		$report['curatorEmail'] = $referenceQ['email'];

		$thisResponse['evidence'][count($thisResponse['evidence'])] = $report;
	}

	$responseArray[count($responseArray)] = $thisResponse;
}

echo json_encode($responseArray);

?>