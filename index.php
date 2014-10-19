<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dopamine</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/landing.css" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Oxygen:400,300,700' rel='stylesheet' type='text/css'>
  </head>
  <body>

    <div id="header" style="display:none;">
      <div id="headerContent">
        <img src="img/brainMap.png" width="35" height="35" id="headerImg"/>
        <span id="headerTitle">Golgi</span>
      </div>
    </div>

    <div style="position: absolute; left:0px; min-width:1200px; width:100%; z-index:1; background-image: url('img/landing1.png'); background-size: 100%; background-repeat: no-repeat; background-color: #2C3E50;">
    	<div style="float:left; width:10%; height:100%;">
    		<div style="position: relative; left:0px; width:100%; background-color:#EAE0BF; top:240px; height:120px;"></div>

    		<div style="position: relative; left:0px; width:100%; background-color:#EAE0BF; top:280px; height:75px;"></div>
    	</div>
    	<div class="" style="float:left; width:80%; top:70px; height:900px; margin-bottom: 20px;">
    		<div style="position:relative; left:80px; top:110px; width:120px; height:120px;">
    			<img src="img/brainMap.png" width="120" height="120"/>
    		</div>
    		<div style="position:relative; left:0px; top:120px; background-color:#EAE0BF; width:220px; height:120px;">
    			<span style="float:right; width:170px; font-size: 38px; line-height: 1;">
    				EXPLORE <br>
    				THE <br>
    				BRAIN
    			</span>
    		</div>

    		<div style="position:relative; left:0px; top:160px; background-color:#EAE0BF; width:420px; height:75px; padding-top:10px;">
    			<div style="padding-left:50px; width:420px; font-size: 18px; line-height: 1;">
    				Use Golgi to explore 70,000+ reports of the brain’s anatomy, connectivity, more and<br>
					<b>do better neuroscience more easily.</b>
    			</div>
    		</div>

      		<a href="golgi.php"><button class="btn btn-success" id="mainCTA">Launch Golgi</button></a>
	    </div>
    </div>

    <div style="position: absolute; left:0px; top:900px; width:100%; height:900px; z-index:10; background-color: #2C3E50; box-shadow: 0px -40px 100px 20px #2C3E50;">
    	<div style="position: relative; margin-left:auto; margin-right:auto; width:1280px; height:900px; padding-top:100px;">
    		<div id="player"></div>
    		<div id="overlay">
    			<span style="font-size:40px">
					What’s the route between smell and memory?
				</span><br>
				<span style="font-size:28px">
					Where’s the connection between habits and Parkinson’s Disease?
				</span><br>
				<span style="font-size:50px">
					How does one detour into addiction?
				</span><br><br>
				<center>
					<img src="img/brainMap.png"/>
				</center>
				<p style="font-size:18px; padding-left:270px; width:1000px;"><br>We built Golgi to help people answer these kinds of questions.<br><br>
					Golgi will help accelerate the research and treatment of diseases like Parkinson’s and Depression. Layering different types of neuroscientific data onto a single simple brain map helps doctors and researchers quickly and intuitively learn from nuanced data. 
					<br>This lets them do better science faster and more easily. For free.
					<br><br>
					<button class="btn btn-lg btn-warning" style="color:#424242;" onclick="toggleOverlay()"><span class="glyphicon glyphicon-film btn-lg"></span> Watch how (3 min)</button>
					<button class="btn btn-lg btn-success"><span class="glyphicon glyphicon-hand-up btn-lg"></span> Launch Golgi </button>
				</p>
    		</div>
    	</div>
    </div>
    <div style="position: absolute; left:0px; top:1800px; width:100%; z-index:10; background-color: #2C3E50;">
    	<div style="position: relative; margin-left:auto; margin-right:auto; width:1280px; height:900px; padding-top:100px;">
    		
    	</div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        window.player = new YT.Player('player', {
          height: '720',
          width: '1280',
          videoId: 't0Hl3R3QoZA',
          events: {
            // 'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        // event.target.playVideo();
        window.player.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        // if (event.data == YT.PlayerState.PLAYING && !done) {
        //   done = true;
        // }
        if (event.data == YT.PlayerState.PAUSED) {
          $('#overlay').fadeIn(500);
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

      function toggleOverlay()
      {
      	if(document.getElementById('overlay').style.display != "none")
      	{
      		$('#overlay').fadeOut(500);	
      	}
      	else
      	{
      		$('#overlay').fadeIn(500);
      	}
      	
      	onPlayerReady(window.player);
      }
    </script>
  </body>
</html>