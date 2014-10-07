<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

echo "Running";

$link = mysql_connect('localhost', 'root', 'root') or die("Cannot connect");
mysql_select_db('rootle5_flat');

$file = simplexml_load_file('swanson-98-truncated.xml');
$parts = $file->parts->part;
echo "Looping";
for($i=0; $i<count($parts); $i++)
// for($i=0; $i<20; $i++)
{
	// // echo "<b>" . $parts[$i]['abbreviation'] . ": </b>";
	$partQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation='" . $parts[$i]['abbreviation'] . "'"));
	echo "Found Part : " . $parts[$i]['abbreviation'] . ". Was ID='" . $parts[$i]['id'] . "', now is " . $partQ['regionID'] . " <br>";
	
	$targets = $parts[$i]->targets->target;
	if(count($targets) > 0)
	{
		echo "<b>Has connections:</b><br>";
		
		for($j=0; $j<count($targets); $j++)
		{
			$targetQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation='" . $targets[$j]['abbreviation'] . "'"));
			
			$eff = substr($parts[$i]['id'], 1);
			$aff = substr($targets[$j]['id'], 1);
			// echo "&nbsp; &nbsp;?eff=" . $eff . "&aff=" . $aff . " is really " . $partQ['regionID'] . "-> " . $targetQ['regionID'] . "<br>";
			$partID = $partQ['regionID'];
			$targetID = $targetQ['regionID'];

			//
			//comment this out:
			//
			if(mysql_query("INSERT INTO `rootle5_flat`.`connection` (`connectionID`, `sourceID`, `targetID`, `nomenclatureID`, `speciesID`, `width`, `height`, `X`, `Y`) VALUES (NULL, $partID, $targetID, 1, 1, NULL, NULL, NULL, NULL)") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
			{
				echo "&nbsp;INSERTED: " . $parts[$i]['abbreviation'] . "->" . $targets[$j]['abbreviation'] . "<br>";	
			}

			$lastInsert = mysql_insert_id();
			$detailsURL = "http://brancusi.usc.edu/connections/conef-det.php?eff=" . $eff . "&aff=" . $aff;

			//now get manuscript from Kimono
			$request = "https://www.kimonolabs.com/api/86asbi6s?apikey=K5qC0NujHIC6RnADjU6APzIMl0BiSGJJ&eff=" . $eff . "&aff=" . $aff;
			$response = file_get_contents($request);
			$results = json_decode($response, TRUE);
			// var_dump($results);

			for($k=0; $k<count($results['results']['collection1']); $k++)
			{
				$thisReport = $results['results']['collection1'][$k];
				$strength = mysql_escape_string($thisReport['strength']);;
				$technique = mysql_escape_string($thisReport['technique']);
				$injection_site = mysql_escape_string($thisReport['injection_site']);
				$terminal_location = mysql_escape_string($thisReport['terminal_location']);
				$annotation = mysql_escape_string($thisReport['annotation']);
				$refName = mysql_escape_string($thisReport['ref']['text']);
				$refURL = mysql_escape_string($thisReport['ref']['href']);

				if(mysql_query("INSERT INTO `rootle5_flat`.`connectionReport` (`connectionReportID`, `connectionID`, `strengthID`, `techniqueID`, `injectionLocationID`, `terminalFieldID`, `annotation`, `referenceName`, `referenceURL`, `detailsURL`) VALUES (NULL, $lastInsert, '" . $strength . "', '" . $technique . "', '" . $injection_site . "', '" . $terminal_location . "', '" . $annotation . "', '" . $refName . "', '" . $refURL . "', '" . $detailsURL . "')") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
				{
					echo "&nbsp; &nbsp; <span style='color:#F00;'>inserted record " . $k . "</span><br>";
				}
			}
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