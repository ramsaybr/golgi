<?php


include("../asset/config.php");

$query=mysql_query("SELECT * FROM region WHERE interactionX != 0");
while($thisRegion = mysql_fetch_assoc($query))
{
	echo "window.searchable.push(\"" . $thisRegion['name'] . " (" . $thisRegion['abbreviation'] . ")\");<br>";
}

?>