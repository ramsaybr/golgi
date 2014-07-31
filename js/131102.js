window.currentZoom = 1;
window.currentMap = "outline";

$(function(){
	
	$('#intxn').draggable({delay:250, cursor:"move"});

	$("#zoomSlider").slider({	
      value:1,
      min: 1,
      max: 4,
      step: 1,
      slide: function(event, ui) {
        changeZoom(ui.value);
      }
    });
});

function changeZoom(newValue)
{
	window.currentZoom = newValue;
	var dimensions = 480 * Math.pow(2, newValue);
	if(newValue > 1)
		{
			var offset = -((960 * (Math.pow(2,(newValue-3)))));
		}
		else
		{
			var offset = 0;
		}
	document.getElementById('mapDiv').innerHTML="";
	document.getElementById('intxn').style.left=offset;
	document.getElementById('intxn').style.top=offset;
	document.getElementById('mapDiv').style.width=dimensions;
	document.getElementById('mapDiv').style.height=dimensions;
	for(i=1; i<=(Math.pow(2, newValue)); i++)
	{
		document.getElementById('mapDiv').innerHTML = document.getElementById('mapDiv').innerHTML + "<div class=\"mapColumn\" id=\"column_" + i + "\">";
		for(j=1; j<=(Math.pow(2, newValue)); j++)
		{
		 	document.getElementById('column_' + i ).innerHTML = document.getElementById('column_' + i ).innerHTML + "<img src=\"img/map/" + window.currentMap + "/" + newValue + "_tile_" + i + "_" + j + ".png\" width=\"480\" height=\"480\"/>";
		}
		document.getElementById('mapDiv').innerHTML = document.getElementById('mapDiv').innerHTML + "</div>";
	}

	//replace all elements
	//loop thru window.regions[]
	//	change region DOM to match zoomlevel, move accordingly.
	for(i=0; i<window.regions.length; i++)
	{
		switch(currentZoom)
		{
			case(1):
				window.regions[i].domElement.src = window.regions[i].fileToDraw1;
			break;
			case(2):
				window.regions[i].domElement.src = window.regions[i].fileToDraw2;
			break;
			case(3):
				window.regions[i].domElement.src = window.regions[i].fileToDraw3;
			break;
			case(4):
				window.regions[i].domElement.src = window.regions[i].fileToDraw4;
			break;
		}
		window.regions[i].domElement.style.left = window.regions[i].coordinatePlot[currentZoom-1][0];
		window.regions[i].domElement.style.top = window.regions[i].coordinatePlot[currentZoom-1][1];
	}

	//move dialog box if visible
	var mapData = document.getElementById('mapData');
	if(mapData.style.display != "none")
	{
		mapData.style.left = mapData.region.coordinatePlot[window.currentZoom-1][0];
		mapData.style.top = (mapData.region.coordinatePlot[window.currentZoom-1][1])-(250);
		// document.getElementById('mapData').style.top = (region.coordinatePlot[window.currentZoom-1][1])-250;
	}
}

function updateMap(pass)
{
	newValue = window.currentZoom;
	switch(pass)
	{
		case(1):
			window.currentMap = "outline";
			break;
		case(2):
			window.currentMap = "regions";
			break;
		case(3):
			window.currentMap = "nomenclature";
			break;

	}
	document.getElementById('mapDiv').innerHTML = "";
	for(i=1; i<=(Math.pow(2, newValue)); i++)
	{
		document.getElementById('mapDiv').innerHTML = document.getElementById('mapDiv').innerHTML + "<div class=\"mapColumn\" id=\"column_" + i + "\">";
		for(j=1; j<=(Math.pow(2, newValue)); j++)
		{
		 	document.getElementById('column_' + i ).innerHTML = document.getElementById('column_' + i ).innerHTML + "<img src=\"img/map/" + window.currentMap + "/" + newValue + "_tile_" + i + "_" + j + ".png\" width=\"480\" height=\"480\"/>";
		}
		document.getElementById('mapDiv').innerHTML = document.getElementById('mapDiv').innerHTML + "</div>";
	}
}