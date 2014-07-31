<?php

include('php/header_update.php');

$uID = 0;
if(isset($_SESSION['uID']))
{
	//logged in with session
	$uID = $_SESSION['uID'];
}
else if(isset($_COOKIE['uID']))
{
	$uID = $_COOKIE['uID'];
}
if($uID == 0)
{
	//not logged in
	header('location:login.php');
}
else
{
	$link = mysql_connect('localhost', 'usegol5_golgi', 'g9752pikachu') or die("Cannot connect");
	mysql_select_db('usegol5_flat');

	//get regions
	$regions = array();
	$completion = 0;
	$query = mysql_query("SELECT * FROM region");
	while($thisRegion = mysql_fetch_assoc($query))
	{
		$newRegion = array();
		$newRegion['id'] = $thisRegion['regionID'];
		$newRegion['name'] = $thisRegion['name'];
		$newRegion['abbreviation'] = $thisRegion['abbreviation'];
		$newRegion['X'] = $thisRegion['X'];
		$newRegion['Y'] = $thisRegion['Y'];
		$newRegion['width'] = $thisRegion['width'];
		$newRegion['height'] = $thisRegion['height'];
		$newRegion['interactionX'] = $thisRegion['interactionX'];
		$newRegion['interactionY'] = $thisRegion['interactionY'];

		//check completion
		if($newRegion['X'] != NULL && $newRegion['X'] > 0)
		{
			$completion++;
		}
		if($newRegion['Y'] != NULL && $newRegion['Y'] > 0)
		{
			$completion++;
		}
		if($newRegion['interactionX'] != NULL && $newRegion['interactionX'] > 0)
		{
			$completion++;
		}
		if($newRegion['interactionY'] != NULL && $newRegion['interactionY'] > 0)
		{
			$completion++;
		}
		if($newRegion['width'] != NULL && $newRegion['width'] > 0)
		{
			$completion++;
		}
		if($newRegion['height'] != NULL && $newRegion['height'] > 0)
		{
			$completion++;
		}
		array_push($regions, $newRegion);
	}

	//get user data
	$userQ = mysql_fetch_assoc(mysql_query("SELECT * FROM user WHERE userID='" . $uID . "'"));
	$user = array();
	$user['fName'] = $userQ['fName'];
	$user['lName'] = $userQ['lName'];
	$user['email'] = $userQ['email'];

	$pointsQ = mysql_fetch_assoc(mysql_query("SELECT * FROM points WHERE userID='" . $uID . "'"));
	$user['points'] = $pointsQ['points'];
}

?>

<div style="position:absolute; left:0px; width:100%; top:0px; height:100%;">
	<div style="position:relative; margin-left:auto; margin-right:auto; top:00px; height:40px; width:100%; background-color:#2c3e50; box-shadow: 0px 1px 5px 1px #000;">
		<div style="position:relative; margin-left: auto; margin-right: auto; top:50px; width:960px; height:40px;">
			<img src="img/brainMap.png" style="position:absolute; left:0px; top:-45px; z-index:10; width:30px; height:30px;"/>
			<span style="position: absolute; left:40px; font-size:14px; font-family:Raleway; top:-40px; color:#ecf0f1;">Golgi</span>
			<a href="../login.php?logout"><span style="position: absolute; right:40px; font-size:14px; font-family:Raleway; top:-40px; color:#ecf0f1;">Logout</span></a>
		</div>
	</div>
	<div style="position:relative; margin-left:auto; margin-right:auto; top:30px; height:600px; width:960px;">
		<!-- Results Area -->
		<div style="position:absolute; left:0px; top:70px; width:200px; height:530px; font-size:10px; overflow-y:scroll;">
			<?php
				for($a=0; $a<count($regions); $a++)
				{
					

					echo '<div style="position:relative; left:0px; top:0px; margin-bottom:5px; width:100%; height:20px; font-size:10px; color:#424242;">';
					echo '<span style="font-size:10px; cursor:pointer;" onclick="details(' . $regions[$a]['id'] . ')"';
					
					//how much data is complete?
					// 0? some? all?
					$status = 0;
					if($regions[$a]['X'] != NULL && $regions[$a]['X'] > 0)
					{
						$status++;
					}
					if($regions[$a]['Y'] != NULL && $regions[$a]['Y'] > 0)
					{
						$status++;
					}
					if($regions[$a]['width'] != NULL && $regions[$a]['width'] > 0)
					{
						$status++;
					}
					if($regions[$a]['height'] != NULL && $regions[$a]['height'] > 0)
					{
						$status++;
					}
					if($regions[$a]['interactionX'] != NULL && $regions[$a]['interactionX'] > 0)
					{
						$status++;
					}
					if($regions[$a]['interactionY'] != NULL && $regions[$a]['interactionY'] > 0)
					{
						$status++;
					}

					switch($status)
					{
						case 0:
							echo 'class="label label-important"';
							break;
						case 6:
							echo 'class="label label-success"';
							break;
						default:
							echo 'class="label label-warning"';
							break;
					}

					echo '>(' . $regions[$a]['abbreviation'] . ') ' . $regions[$a]['name'] . '</span>';
					echo '</div>';
				}
			?>
		</div>
		<!-- Progress Bar -->
		<div style="position:absolute; left:0px; top:0px; width:600px; height:40px;">
			Completion:<br><br>
			<div class="progress" style="width:400px;">
				<div class="bar bar-success" id="completion" style="width:<?php echo (($completion/5772)*100);?>%">
				</div>
			</div>
		</div>

		<!-- User Info -->
		<div style="position:absolute; right:0px; top:0px; width:300px; height:100px;">
			<div style="position:absolute; left:10px; top:10px; width:60px; height:60px; border-radius:60px; background-color:#e67e22; color:#FFF; font-size:42px; font-weight:100;">
				<span style="position:absolute; left:16px; top:4px;">
					<?php echo $user['fName'][0]; ?>
				</span>
			</div>
			<div style="position:absolute; left:100px; top:10px; font-size:16px;">
				<?php
					echo $user['fName'] . " " . $user['lName'];
				?>
			</div>
			<div style="position:absolute; left:100px; top:30px; font-size:36px;">
				<b>
					<?php
						echo "<span id=\"points\">" . $user['points'] . "</span> <span style='font-size:16px;'>pts</span>";
					?>
				</b>
			</div>
		</div>

		<div style="position:absolute; left:220px; top:80px; width:500px; height:500px;">
			<div style="position:absolute; left:0px; top:0px; width:100%; font-size:28px; text-align: center;" id="name">
				Click a region on the left to start!
			</div>
			<input style="position:absolute; left:50px; top:100px; width:400px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="Abbreviation" title="Abbreviation" id="abbreviation">
			<input style="position:absolute; left:50px; top:160px; width:190px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="X Position" title="X Position" id="X">
			<input style="position:absolute; left:260px; top:160px; width:190px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="Y Position" title="Y Position" id="Y">
			<input style="position:absolute; left:50px; top:220px; width:190px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="Width" title="Width" id="width">
			<input style="position:absolute; left:260px; top:220px; width:190px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="Height" title="Height" id="height">
			<input style="position:absolute; left:50px; top:280px; width:190px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="Pin X" title="Pin X" id="interactionX">
			<input style="position:absolute; left:260px; top:280px; width:190px; height:40px; font-size:20px; border:1px solid #ABABAB; text-align:center;" type="text" value="Pin Y" title="Pin Y" id="interactionY">
			<div class="btn btn-success" style="position:absolute; left:50px; top:340px; width:380px; height:40px; font-size:30px; line-height: 1;" onclick="update()">Update</div>
			<div style="position: absolute; left:50px; width:400px; top:400px; height:300px;" id="history">
				
			</div>
		<div>

		
	</div>
</div>
<div style="position:absolute; left:0px; width:100%; top:0px; height:100%; z-index:10; background-color:rgba(255,255,255,.6); display:none;" id="feedbackBox">
	<div style="position:relative; margin-left:auto; margin-right:auto; width:600px; top:100px; height:400px; background-color:#FFF; box-shadow: 0px 0px 10px 0px #424242; font-size:48px;">
		<center>
			<div id="feedback" style="display:none">
				<br><br><br>
				Got it! Thanks.
			</div>
			<div id="reward" style="display:none;">
				<img id="rewardImg" src="img/update/awesome1.png"/>
			</div>
		</center>
	</div>
</div>

<?php

include('php/footer_update.php');

?>
</html>