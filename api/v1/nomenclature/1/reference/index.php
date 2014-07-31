<?php


$link = mysql_connect('localhost', 'rootle5_flatUser', 'flat9752pikachu') or die("Cannot connect");
mysql_select_db('rootle5_flat');

$regionID = $_GET['rID'];

$q1 = mysql_query("SELECT * FROM connection WHERE sourceID='" . $regionID . "' OR targetID='" . $regionID . "'");

$connections = array();
$references = array();
while($thisConnection = mysql_fetch_assoc($q1))
{
	$connections[count($connections)] = $thisConnection['connectionID'];
	$q2 = mysql_query("SELECT * FROM connectionReport WHERE connectionID='" . $thisConnection['connectionID'] . "'");
	while($thisReport = mysql_fetch_assoc($q2))
	{
		if(!(in_array($thisReport['referenceID'], $references)))
		{
			$references[count($references)] = $thisReport['referenceID'];
		}
	}
}
//now find reference details
$referenceData = array();
for($i=0; $i<count($references); $i++)
{
	$refQuery = mysql_fetch_assoc(mysql_query("SELECT * FROM reference WHERE referenceID='" . $references[$i] . "'"));
	$thisRef = array();
	$thisRef['referenceID'] = $refQuery['referenceID'];
	$thisRef['name'] = $refQuery['name'];
	$thisRef['authors'] = $refQuery['authors'];
	$thisRef['url'] = $refQuery['url'];
	$referenceData[count($referenceData)] = $thisRef;
}

echo json_encode($referenceData);



?>