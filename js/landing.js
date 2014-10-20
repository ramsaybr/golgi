function showScreen(pass)
{
  document.getElementById('screenShotImg').src = "img/screenshot/" + pass + ".png";
  $('#screenShotModal').modal('toggle');
}


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