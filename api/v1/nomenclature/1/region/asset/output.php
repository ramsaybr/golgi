<?php


include("config.php");
$query=mysql_query("SELECT * FROM region WHERE interactionX != 0");
while($thisRegion = mysql_fetch_assoc($query))
{
	echo "On " . $thisRegion['abbreviation'] . ": ";
	// if(mkdir('../' . $thisRegion['abbreviation']))
	// {
	// 	echo "Made new dir, ";
	// 	if(copy('region2.php', '../' . $thisRegion['abbreviation'] . '/index.php'))
	// 	{
			// echo "copied index, ";
			if(mkdir('../' . $thisRegion['abbreviation'] . "/cell"))
			{
				echo "made cell dir,";
				if(copy('cell.php', '../' . $thisRegion['abbreviation'] . '/cell/index.php'))
				{
					echo "copied cell!<br>";
				}
			}
	// 	}
	// }
}


?>