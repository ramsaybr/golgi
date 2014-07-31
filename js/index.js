setInterval(function(){scrollBread()}, 500);
startDev2();

function scrollWindow(pass)
{
   $('html,body').animate({scrollTop: ($("#" + pass).offset().top)-50}, 1000);
}

function startDev1()
{
  window.dev1=1;
  window.animate1 = setInterval(function(){animateDev1()}, 8000);
}

function animateDev1()
{
  $('#code1').fadeIn(0).delay(2000).fadeOut(0);
  $('#code2').delay(500).fadeIn(0).delay(1500).fadeOut(0);
  $('#code3').delay(1000).fadeIn(0).delay(1000).fadeOut(0);
  
  $('#dev1Cake').delay(4000).fadeIn(0).delay(1000).fadeOut(0);
}

function startDev2()
{
  window.dev2=1;
  window.dice = setInterval(function(){rollDice()}, 2000);
  $(function() {
      var $elie = $('#gear'), degree = 0, timer;
      rotate();
      function rotate() {

            // For webkit browsers: e.g. Chrome
          $elie.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});
            // For Mozilla browser: e.g. Firefox
          $elie.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});

            // Animate rotation with a recursive call
          window.timer = setTimeout(function() {
              ++degree; rotate();
          },20);
          //20
      }

      });
}

function stopDev1()
{
  window.dev1=0;
  window.clearTimeout(window.animate1);

}
function stopDev2()
{
  window.dev2=0;
  window.clearTimeout(window.timer);
  window.clearInterval(window.dice);
}


function scrollBread()
{
  var currentScroll = $(window).scrollTop();
  if(currentScroll < 900)
  { 
	if(window.dev2 == 0)
    {
      startDev2(); 
    }
    stopDev1();
  }
  if(currentScroll > 900 && currentScroll < 1800)
  { 
    stopDev2();
    if(window.dev1 == 0)
    {
      startDev1();
    }
  }
}

function about()
{
  if(document.getElementById('fp_aboutDiv').style.display=='none')
  {
    $('#fp_aboutDiv').fadeIn(500).delay(12000).fadeOut(500);
  }
}

function rollDice()
{
  //check for scrolling
  
  var roll = (Math.floor((Math.random()*20)+1));
  if((roll == 1) || (roll == 2) || (roll == 3) || (roll == 4) || (roll == 5))
  {
    moveCake();
  }
  else if((roll == 6) || (roll == 7) || (roll == 8) || (roll == 9) || (roll == 10))
  {
    clearCake();
  }
}
function moveCake()
{
    $("#newCake").fadeIn(0);
    var newCake = document.createElement('img');
    newCake.src = "http://www.freeplay.co/img/cake.png";
    newCake.style.position = 'absolute';
    newCake.style.left = '0px';
    newCake.style.top = '340px';
    newCake.style.zIndex=1;
    newCake.id = "newCake";
    newCake.className = "newCake";

    document.getElementById('fp_centerPage_dev').appendChild(newCake);
   
    var arc_params = {
      center: [80,540],  
      radius: 200,    
      start: 190,
      end: 110,
      dir: -1
    };

    $("#newCake").animate({path : new $.path.arc(arc_params)}, 500);
    $("#newCake").delay(1000).fadeOut(1000);
    //document.getElementById('newCake').className = "oldCake";
    $('.newCake').toggleClass('oldCake');
    $('.newCake').toggleClass('newCake');


}

function clearCake()
{
  $('.oldCake').remove();
}

// function showHeart()
// {
//     $('#brandLoveCake').fadeIn(0);
//     $(".newHeart").fadeIn(0);

//     var newHeart = document.createElement('img');
//     newHeart.src = "img/brandLoveHeart.png";
//     newHeart.style.position = 'absolute';

//     var placement = (Math.floor((Math.random()*4)+1));
//     if(placement%2 != 0)
//     {
//       newHeart.style.left = '0px';
//     }
//     else
//     {
//       newHeart.style.left = '270px';
//     }

//     newHeart.style.top = (placement * 50) + 'px';
//     newHeart.style.zIndex=1;
//     newHeart.id = "newHeart";
//     newHeart.className = "newHeart";

//     document.getElementById('iphoneBox').appendChild(newHeart);
   
//     var arc_params = {
//       center: [230,500], 
//       radius: 200,
//       start: 190,
//       end: 110,
//       dir: -1
//     };

//     $(".newHeart").delay(5000).fadeOut(3000);
//     //document.getElementById('newCake').className = "oldCake";
//     $('#brandLoveCake').delay(1000).fadeOut(2000);
// }


function emailDev()
{
  window.emailType = 1;
  document.getElementById('fp_lightboxText').style.fontSize="20px";
  document.getElementById('fp_lightboxText').innerHTML = "Hi! <br>Enter your email to receive a beta API key and documentation.";
  $('#fp_veil').fadeIn(500);
}

function emailBrand()
{
  window.emailType = 2;
  document.getElementById('fp_lightboxText').style.fontSize="16px";
  document.getElementById('fp_lightboxText').innerHTML = "Hi! <br>Mike will contact you soon to explore the plans we offer.<br>What address can he contact you at?";
  $('#fp_veil').fadeIn(500);
}

function send()
{

  type = window.emailType;
  email = document.getElementById('fp_emailInput').value;
  if(email != "")
  {
    xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
      {
        success = xmlHttp.responseText;
        if(Number(success) == 1)
        {
          document.getElementById('fp_lightboxText').innerHTML = "Got it! We will contact you soon.";
          closeVeil(1);
        }
      }
    }
    var json = "{\"email\":\"" + email + "\", \"type\":" + type + "}";
    var url = "signup/request.php?j=" + json;
    xmlHttp.open("GET",url,true);
    xmlHttp.send();
  }
  else
  {
    alert("Oops! Please enter an address");
  }
}


function closeVeil(pass)
{
  if(pass == 1)
  {
    $('#fp_veil').delay(2000).fadeOut(500);  
  }
  else
  {
    $('#fp_veil').fadeOut(500);
  }
}
