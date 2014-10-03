<?php


include("config.php");
$query=mysql_query("SELECT * FROM region WHERE interactionX != 0");
while($thisRegion = mysql_fetch_assoc($query))
{
	echo "On " . $thisRegion['abbreviation'] . ": ";
	if(mkdir('../' . $thisRegion['abbreviation']))
	{
		echo "Made new dir, ";
		if(copy('region2.php', '../' . $thisRegion['abbreviation'] . '/index.php'))
		{
			echo "copied index, ";
			if(mkdir('../' . $thisRegion['abbreviation'] . "/connection"))
			{
				echo "made connection dir,";
				if(copy('connection.php', '../' . $thisRegion['abbreviation'] . '/connection/index.php'))
				{
					echo "copied connection!<br>";
				}
			}
		}
	}
}


?>