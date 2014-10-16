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
{
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

			$lastInsert = mysql_insert_id();

			// //now get manuscript from Kimono

			$request = "https://www.kimonolabs.com/api/7fqn2rog?apikey=K5qC0NujHIC6RnADjU6APzIMl0BiSGJJ&aidi=" . $thisPart['bamsID'] . "&id2=" . $cellID;
			$url = "http://brancusi.usc.edu/cells/show-cell.php?aidi=" . $thisPart['bamsID'] . "&id2=" . $cellID;

			$response = file_get_contents($request);
			$results = json_decode($response, TRUE);
			
			var_dump($results['results']['collection1'][0]['neuronName']);
			
			if(mysql_query("INSERT INTO `rootle5_flat`.`cell` (`cellID`, `name`, `regionID`, `regionName`, `regionAbbrev`, `detailsURL`) VALUES (NULL, '" . mysql_escape_string($thisCell['name']) . "', '" . $thisPart['regionID'] . "', '" . mysql_escape_string($thisPart['name']) . "', '" . mysql_escape_string($thisPart['abbreviation']) . "', '" . mysql_escape_string($url) . "')") or die("A MySQL error has occurred.<br />Your Query: " . $your_query . "<br /> Error: (" . mysql_errno() . ") " . mysql_error()))
			{
				echo "&nbsp;INSERTED <br>";	
			}
		}
	}
}
?>