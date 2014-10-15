<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

echo "Running: Parse Cells";

$link = mysql_connect('localhost', 'root', 'root') or die("Cannot connect");
mysql_select_db('rootle5_flat');

$file = simplexml_load_file('swanson-98.xml');
$parts = $file->parts->part;
echo "Looping";
for($i=0; $i<count($parts); $i++)
// for($i=0; $i<20; $i++)
{
	// // echo "<b>" . $parts[$i]['abbreviation'] . ": </b>";
	$partQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation='" . $parts[$i]['abbreviation'] . "'"));
	echo "Found Part : " . $parts[$i]['abbreviation'] . ". Was ID='" . $parts[$i]['id'] . "', now is " . $partQ['regionID'] . " <br>";
	
	$thisPart['name'] = $partQ['name'];
	$thisPart['regionID'] = $partQ['regionID'];
	$thisPart['abbreviation'] = $partQ['abbreviation'];
	$thisPart['bamsID'] = substr($parts[$i]['id'], 1);

	$cells = $parts[$i]->cells->cell;
	if(count($cells) > 0)
	{
		echo "<b>Has cells:</b><br>";
		
		for($j=0; $j<count($cells); $j++)
		{
			$thisCell = $cells[$j];

			
			$partID = substr($parts[$i]['id'], 1);
			$cellID = substr($cells[$j]['id'], 1);

			//
			//
			//
			// <cell id="c235" name= "simple bipolar neuron" url_base_ref="u4" url_param="aidi=295&amp;id2=235" />
			//
			//
			//

			$lastInsert = mysql_insert_id();
			// $detailsURL = "http://brancusi.usc.edu/connections/conef-det.php?eff=" . $eff . "&aff=" . $aff;

			// //now get manuscript from Kimono

			$request = "https://www.kimonolabs.com/api/7yzpbz4o?apikey=K5qC0NujHIC6RnADjU6APzIMl0BiSGJJ&aidi=" . $thisPart['bamsID'] . "&chem=" . $cellID;
			$response = file_get_contents($request);
			$results = json_decode($response, TRUE);
			
			// var_dump($results['results']['collection1'][0]['reference']['text']);
			// var_dump($results['results']['collection1'][0]['reference']['href']);
			// var_dump($results['results']['collection1'][0]['moreData']['href']);
			$explodeURL = explode('&', $results['results']['collection1'][0]['moreData']['href']);
			$typeExplode = explode('=', $explodeURL[2]);
			$whatExplode = explode('=', $explodeURL[3]);

			$type = $typeExplode[1];
			$what = $whatExplode[1];


			//get second set of details from second API
			$request2 = "https://www.kimonolabs.com/api/ad10ni00?apikey=K5qC0NujHIC6RnADjU6APzIMl0BiSGJJ&aidi=" . $thisPart['bamsID'] . "&chem=" . $molID . "&type=" . $type . "&what=" . $what;
			$response2 = file_get_contents($request2);
			$results2 = json_decode($response2, TRUE);
			var_dump($results2['results']);

			if(mysql_query("INSERT INTO `rootle5_flat`.`molecule` (`moleculeID`, `name`, `regionID`, `regionName`, `regionAbbrev`, `distribution`, `strength`, `annotation`, `referenceName`, `referenceURL`, `detailsURL`) VALUES (NULL, '" . mysql_escape_string($thisMolecule['name']) . "', '" . $thisPart['regionID'] . "', '" . mysql_escape_string($thisPart['name']) . "', '" . mysql_escape_string($thisPart['abbreviation']) . "', '" . mysql_escape_string($results2['results']['collection1'][0]['distribution']) . "', '" . mysql_escape_string($results2['results']['collection1'][0]['strength']) . "', '" . mysql_escape_string($results2['results']['collection1'][0]['annotation']) . "', '" . mysql_escape_string($results['results']['collection1'][0]['reference']['text']) . "', '" . mysql_escape_string($results['results']['collection1'][0]['reference']['href']) . "', '" . mysql_escape_string($results2['results']['collection2'][2]['property5']['href']) . "')") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
			{
				echo "&nbsp;INSERTED <br>";	
			}

			// mysql_query("UPDATE molecule SET referenceName='" . $results['results']['collection1'][0]['reference']['text'] . "' WHERE FirstName='Peter' AND LastName='Griffin'");
			// for($k=0; $k<count($results['results']['collection1']); $k++)
			// {
			// 	$thisReport = $results['results']['collection1'][$k];
			// 	$strength = mysql_escape_string($thisReport['strength']);;
			// 	$technique = mysql_escape_string($thisReport['technique']);
			// 	$injection_site = mysql_escape_string($thisReport['injection_site']);
			// 	$terminal_location = mysql_escape_string($thisReport['terminal_location']);
			// 	$annotation = mysql_escape_string($thisReport['annotation']);
			// 	$refName = mysql_escape_string($thisReport['ref']['text']);
			// 	$refURL = mysql_escape_string($thisReport['ref']['href']);

			// 	if(mysql_query("INSERT INTO `rootle5_flat`.`connectionReport` (`connectionReportID`, `connectionID`, `strengthID`, `techniqueID`, `injectionLocationID`, `terminalFieldID`, `annotation`, `referenceName`, `referenceURL`, `detailsURL`) VALUES (NULL, $lastInsert, '" . $strength . "', '" . $technique . "', '" . $injection_site . "', '" . $terminal_location . "', '" . $annotation . "', '" . $refName . "', '" . $refURL . "', '" . $detailsURL . "')") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
			// 	{
			// 		echo "&nbsp; &nbsp; <span style='color:#F00;'>inserted record " . $k . "</span><br>";
			// 	}
			// }
		}
	}
	
	// 	// echo $parts[$i]['abbreviation'] . "->" . $targets[$j]['abbreviation'] . "<br>";
	// 	echo $partQ['regionID'] . "->" . $targetQ['regionID'];
	// 	$partID = $partQ['regionID'];
	// 	$targetID = $targetQ['regionID'];
	// 	// if(mysql_query("INSERT INTO `rootle5_flat`.`connection` (`connectionID`, `sourceID`, `targetID`, `nomenclatureID`, `speciesID`, `width`, `height`, `X`, `Y`) VALUES (NULL, $partID, $targetID, 1, 1, NULL, NULL, NULL, NULL)") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
	// 	// {
	// 	// 	echo " <b> INSERTED </b>";
	// 	// }
	// 	echo "<br>";


	// }

	// echo "<br>";
}


//loop thru all parts
//	query: find this parts new ID number
//	loop thru targets
//		query: find this target's new ID number based on its abbrev
//		insert new record into connections

?>