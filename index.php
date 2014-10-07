<?php

include('php/header.php');
phpinfo();

?>

<div style="position:absolute; left:0px; width:100%; top:0px; height:100%;">
	<div style="position:relative; margin-left:auto; margin-right:auto; top:00px; height:370px; width:100%; background-color:#f0a10d; box-shadow: 0px 1px 5px 1px #000;">
		<div style="position:relative; margin-left: auto; margin-right: auto; top:50px; width:960px; height:320px;">
			<img src="img/header.png" style="position:absolute; top:20px;"/>
			<img src="img/brainMap.png" style="position:absolute; left:0px; top:-45px; z-index:10; width:30px; height:30px;"/>
			<span style="position: absolute; left:40px; font-size:14px; font-family:Raleway; top:-40px;">Neuraccess</span>
			<span class="btn btn-small btn-success"style="position: absolute; right:10px; font-size:14px; font-family:Raleway; top:-40px;">Log in</span>
		</div>
	</div>
	<div style="position:relative; margin-left:auto; margin-right:auto; top:20px; height:1000px; width:960px;">
		<div style="position:absolute; left:0px; width:400px; top:45px; height:400px;">
			<div style="position:absolute; left:10px; width:380px; top:10px; height:60px; font-size:32px;">
				Try the map now:
			</div>
			<a href="golgi.php">
				<div class="btn btn-success" style="position: absolute; left:0px; top:100px; width:100%; height:70px; line-height: 2; font-size:32px;">Launch Neuraccess</div>
			</a>
			<div style="position:absolute; left:10px; width:380px; top:220px; height:60px; font-size:32px; text-align: center;">
				<img src="img/ui/pin2.png"/>
				<img src="img/ui/connection.png" width="40" height="60"/>
				<img src="img/ui/molecule.png" width="40" height="60"/>
				<img src="img/ui/cellType.png" width="40" height="60"/>
				<img src="img/ui/paper.png" width="40" height="60"/>
			</div>
		</div>
		<div style="position:absolute; left:540px; width:400px; top:0px; height:400px;">
			<div style="position:absolute; left:10px; width:380px; top:10px; height:60px; font-size:20px; font-weight: bold;">
				Neuraccess is an interactive flat map of the brain and its connections, cell types, and molecules.
			</div>
			<div style="position:absolute; left:100px; width:200px; top:90px; height:200px;">
				<img src="img/brainMap.png"/>
			</div>
			<div style="position:absolute; left:10px; width:380px; bottom:10px; height:90px;">
				Based on a world-class neuroanatomical atlas and powered by the Brain Architecture Management System, Neuraccess is the world's first deeply interactive 
			</div>
		</div>
	</div>
</div>

<?php

include('php/footer.php');

?>
</html>