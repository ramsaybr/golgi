function hand()
{
	//document.getElementById('mapDiv').style.cursor="move";
	document.getElementById('intxn').style.cursor="move";

}

function noHand()
{
	//document.getElementById('mapDiv').style.cursor="default";
	document.getElementById('intxn').style.cursor="default";
}
$(function(){
	$('#intxn').draggable();

	$("#zoomSlider").slider({	
      value:1,
      min: 1,
      max: 5,
      step: 1,
      slide: function(event, ui) {
        changeZoom(ui.value);
      }
    });
});

function changeZoom(newValue)
{
	console.log(newValue);
	var dimensions = 480 * Math.pow(2, newValue);
	if(newValue > 1)
		{
			var offset = -((960 * (Math.pow(2,(newValue-3)))));
		}
		else
		{
			var offset = 0;
		}
	console.log(offset);
	document.getElementById('mapDiv').innerHTML="";
	document.getElementById('mapDiv').style.left=offset;
	document.getElementById('mapDiv').style.top=offset;
	document.getElementById('mapDiv').style.width=dimensions;
	document.getElementById('mapDiv').style.height=dimensions;
	for(i=1; i<=(Math.pow(2, newValue)); i++)
	{
		//alert("in loop");
		document.getElementById('mapDiv').innerHTML = document.getElementById('mapDiv').innerHTML + "<div class=\"mapColumn\" id=\"column_" + i + "\">";
		for(j=1; j<=(Math.pow(2, newValue)); j++)
		{
		 	document.getElementById('column_' + i ).innerHTML = document.getElementById('column_' + i ).innerHTML + "<img src=\"img/map/" + newValue + "_tile_" + i + "_" + j + ".png\" width=\"480\" height=\"480\"/>";
		}
		document.getElementById('mapDiv').innerHTML = document.getElementById('mapDiv').innerHTML + "</div>";
	}
}

function addData()
{
	
	if(document.getElementById('addButton').innerHTML=="+")
	{
		document.getElementById('addButton').innerHTML="x";
		$('#addView').animate({width:"400", height:"210"}, 500);
		$('#addPrompt').fadeOut(500);
		$('#addElementContainer').fadeIn(500);
		$('#addButton').toggleClass('btn-success');
		$('#addButton').toggleClass('btn-danger');	
	}
	else
	{
		document.getElementById('addButton').innerHTML="+";
		$('#addView').animate({width:"200", height:"100"}, 500);
		$('#addPrompt').fadeIn(500);
		$('#addElementContainer').fadeOut(500);
		$('#addButton').toggleClass('btn-success');
		$('#addButton').toggleClass('btn-danger');
	}
	
}

function whichDOMNode(clickedNode)
{
	alert(clickedNode);
}