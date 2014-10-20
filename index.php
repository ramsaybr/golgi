<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta property="og:image" content="img/brainMap.png"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Golgi</title>

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

    <div id="intro">
    	<div id="floatBanners">
    		<div id="floatBannerTop"></div>
    		<div id="floatBannerBottom"></div>
    	</div>
    	<div id="introTextArea">
    		<!-- <div style=""> -->
    			<img src="img/brainMap.png" width="120" height="120" id="introLogo"/>
    		<!-- </div> -->
    		<div id="introText1">
    			<span style="float:right; width:270px; font-size: 26px; line-height: 1; padding-top:15px;">
    				A Modern Way to<br>
            Explore the Brain
    			</span>
    		</div>

    		<div id="introText2">
    			<div id="introText2Padding">
    				Do better neuroscience:
            use Golgi to easily navigate thousands of reports of the brain’s anatomy, connectivity, more.
    			</div>
    		</div>

      		<a href="golgi.php"><button class="btn btn-success" id="mainCTA">Launch Golgi</button></a>
	    </div>

      <img src="img/arrowDown.png" id="arrowDown"/>
      <div id="introArrowPrompt">Learn more</div>
    </div>

    <div id="page2">
    	<div id="page2center">
    		<div id="player"></div>
    		<div id="overlay">
    			<span style="font-size:30px">
					What’s the route between smell and memory?
				</span><br>
				<span style="font-size:21.2px">
					Where’s the connection between habits and Parkinson’s Disease?
				</span><br>
				<span style="font-size:38px">
					How does one detour into addiction?
				</span><br>
        <span style="font-size:30px">
          What does this have to do with Schizophrenia?
        </span><br><br><br><br>
				
				<p id="page2Text">
          <br>
          Systems-level questions like these will define the next 50 years of neuroscience. <br>
          <b>We built Golgi to help people answer these kinds of questions.</b><br><br><br>
          Golgi makes it easy for scientists to aggregate data about the brain into high-level explanations.<br>
					<b>This lets them do better science faster. For free.</b>
					<br><br><br>
					<button class="btn btn-lg btn-warning" style="color:#424242;" onclick="toggleOverlay()"><span class="glyphicon glyphicon-film btn-lg"></span> Meet us (3 min)</button>
					<a href="golgi.php"><button class="btn btn-lg btn-success"><span class="glyphicon glyphicon-hand-up btn-lg"></span> Launch Golgi </button></a>
				</p>
    		</div>
    	</div>
    </div>
    <div id="page3">
    	<div id="page3center">
        <p id="page3title">
    		  Golgi combines sourced data about the brain's connectivity, cellular makeup, and molecular profile onto a streamlined anatomical map.
        </p>
        <img src="img/screenshot/1_thumb.png" width="100" height="100" class="page3Img" style="left:150px;" onclick="showScreen(1)"/>
        <img src="img/screenshot/2_thumb.png" width="100" height="100" class="page3Img" style="left:350px;" onclick="showScreen(2)"/>
        <img src="img/screenshot/3_thumb.png" width="100" height="100" class="page3Img" style="left:550px;" onclick="showScreen(3)"/>
        <img src="img/screenshot/4_thumb.png" width="100" height="100" class="page3Img" style="left:750px;" onclick="showScreen(4)"/>
        <img src="img/screenshot/5_thumb.png" width="100" height="100" class="page3Img" style="left:950px;" onclick="showScreen(5)"/>
        <span style="left:140px;" class="page3description">Start by searching for a brain region</span>
        <span style="left:340px;" class="page3description">Find its input and output connections</span>
        <span style="left:540px;" class="page3description">Get a clear story about the real data</span>
        <span style="left:740px;" class="page3description">Visualize selected data on the map</span>
        <span style="left:940px;" class="page3description">Save private notes and ideas for later</span>

        <p id="page3conclusion">
          Now researchers have a tool that helps them synthesize reports of different types of data in one common framework.<br>
          This makes it easier for them to explore the type of nuanced systems-level questions that lie underneath many diseases.<br><br><br>
          <a href="golgi.php"><button class="btn btn-success" style="margin-left:950px;"><span class="glyphicon glyphicon-hand-up"></span> Try it out </button></a>
        </p>
        
    	</div>
    </div>

    <div id="page4">
      <div id="page4center">
        <h3>Some questions we often get about Golgi:</h3><br>
        <p>
          <i>Why does the map look the way it does?</i>
          <br>
          This map is an embryonic fate map developed by Dr. Larry Swanson. The map is a modified version of the embryonic tissue on the developing neural plate before envagination into the neural tube. For this brief period in embryological development, every vertebrate's nervous system is - for all intents and purposes - the partial surface of a sphere. All progenitor tissue that will eventually become every part of the nervous system is present on this surface. By distorting the surface area of each region of the neural plate proportional to its volume in the adult form, we get a map of the fates of each brain region represented on the embryological form.<br><br>
        </p><br>
        <p>
          <i>But it's the future! Aren't we supposed to have super crazy 3D visualizations and the such? Like on the televison and on the moving pictures?</i>
          <br>
          We like 3D, one day it will be exciting to transition our data there. For now, the goal of this flattened fate map is to show summary reports of neural connectivity. As such, we think it's well-suited to getting that job done in a way that's intutive for users to interact with.
        </p><br>
        <p>
          <i>Where did the data in Golgi come from?</i>
          <br>
          The data in Golgi is entirely from the rat and mapped using the Swanson-98 nomenclature on a modified version of the Swanson-03 flatmap. This common nomenclature and map makes all the data internally-consistent with all other reports. The vast majority of the data was collected using anatomical tract-tracing techniques (information is available for every single connectivity assertion.)
          <br>The data in Golgi has been sourced (with permission) from the <a href="http://brancusi1.usc.edu" target="_blank">Brain Architecture Management System (BAMS)</a>. The (ubermench) Dr. Mihail Bota hand-sourced the data in BAMS with expert collation and annotation over the past decade. If he gets something like a GitTip account I'm putting his URL here because he's worked his butt off to uphold an exemplary level of attention to detail, precision, and sheer unadulterated hustle.
        </p><br><br>
          <i>But I study peoples. Why should I care about the rat?</i>
          <br>
          At the macrolevel of observation (assertions of connectivity, molecular profile, and cell architecture between entire brain regions), findings in the rat generalize well for most vertebrates more complicated than the rat, human included. This is due to the shared genetic history between vertebrates. More information about systematic frameworks for understanding neuroanatomy within and between species <a href="http://www.ncbi.nlm.nih.gov/pubmed/21078980" target="_blank">can be found here.</a>
        </p><br><br>
        <p>
          <i>How can I contribute?</i>
          <br>
          We're putting the sourcecode and a sanitized version of the database up on Github soon. We'll link to the repo from here. We like forks and pull-requests, constructive criticism, and beer. If you want to get involved more closely with the team, email us at <a href="mailto:usegolgi@gmail.com">usegolgi@gmail.com</a>
        </p><br><br>
        <p>
          <i>What comes next for Golgi?</i>
          <br>
          There's over 7000 connections that we have to manually prepare for display on the map. In the immediate future we're looking forward to automating this process. In the near future we'll be expanding the personalization to let users add their own data to the map in a personal workspace. From there we'll build in the direction the community benefits the most from.<br><br>Have an idea of where you'd take Golgi? Email us. Know enough to build it yourself? Fork the code on GitHub and we'll bring it into the core functionality.
        </p><br><br>
        <p>
          <i>How did you build / who built Golgi?</i>
          <br>
          Golgi was designed and built by <a href="mailto:ramsay.alexander.brown@gmail.com">Ramsay Brown.</a> <br><br>Under Dr. Larry W. Swanson's guidance and feedback, Ramsay built Golgi <a href="img/screenshot/scraps.jpg" target="_blank">in a cave with a box of scraps.</a> 4 years, 3 crappy prototypes, 2 grants, and 1 catastrophic drive failure (we didn't know version control existed yet...) and an ocean of espresso and IPA later and we're really proud to release it to you. <br><br>
          We couldn't have buit Golgi without the support of Dr. Mihail Bota, Dr. Gully APC Burns, Dr. Rick Thompson, Ms. Cathy Crayton, T. Dalton Combs, Makaela O'Connell, Sayuli Bidhe, Jaspar Abu-Jabar, Bisrat Woldemichael, the Rose Hills Foundation, and the University of Southern California.
        </p><br><br>
        <br><br>
        <center>
          <img src="img/brainMap.png"/>
        </center>
      </div>
    </div>


    <!-- Molecule Details Modal -->
    <div class="modal fade" id="screenShotModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <center>
              <img src="img/screenshot/1.png" id="screenShotImg"/>
            </center>
          </div>
        </div>
      </div>
    </div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/landing.js"></script>
  </body>
</html>