<?php

echo "Running";

$link = mysql_connect('localhost', 'root', 'root') or die("Cannot connect");
mysql_select_db('rootle5_flat');

$file = simplexml_load_file('swanson-98.xml');
$parts = $file->parts->part;
echo "Looping";
// for($i=0; $i<count($parts); $i++)
for($i=0; $i<20; $i++)
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
			echo "&nbsp;" . $parts[$i]['abbreviation'] . "->" . $targets[$j]['abbreviation'] . "<br>";
			$eff = substr($parts[$i]['id'], 1);
			$aff = substr($targets[$j]['id'], 1);
			// echo "&nbsp; &nbsp;?eff=" . $eff . "&aff=" . $aff . " is really " . $partQ['regionID'] . "-> " . $targetQ['regionID'] . "<br>";
			$partID = $partQ['regionID'];
			$targetID = $targetQ['regionID'];

			//
			//comment this out:
			//
			// if(mysql_query("INSERT INTO `rootle5_flat`.`connection` (`connectionID`, `sourceID`, `targetID`, `nomenclatureID`, `speciesID`, `width`, `height`, `X`, `Y`) VALUES (NULL, $partID, $targetID, 1, 1, NULL, NULL, NULL, NULL)") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()));
			//now get from Kimono
			$request = "https://www.kimonolabs.com/api/86asbi6s?apikey=K5qC0NujHIC6RnADjU6APzIMl0BiSGJJ&&eff=" . $eff . "&aff=" . $aff;
			echo "requesting from: " . $request;
			//
			//and this:
			//
			// $response = file_get_contents($request);
			$results = json_decode($response, TRUE);
			var_dump($results);
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