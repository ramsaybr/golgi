window.currentZoom = 1;
window.currentMap = "outline";

$(function(){
	
	$('#intxn').draggable({delay:250, cursor:"move"});

	$("#zoomSlider").bootstrapSlider({
		value:2,
		min: 1,
		max: 4,
		step: 1
	}).on('slideStop', changeZoom);
});

function changeZoom(newValue, instance)
{
	if(instance == "init")
	{
		newValue = 2;
	}
	else
	{
		newValue = $('#zoomSlider').bootstrapSlider('getValue');
	}
	// var newValue = ;

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
		console.log("scaling regions. i=" + i);
		console.log("curentZoom = " + currentZoom);
		// window.regions[i].pin.src = "img/ui/pin/" + currentZoom + "_r.png";
		window.regions[i].pin.src = "img/ui/pin/2_r.png";
		// window.regions[i].pin.width = 10 * currentZoom;
		// window.regions[i].pin.height = 30 * currentZoom;
		window.regions[i].pin.width = 20 * currentZoom;
		window.regions[i].pin.height = 60 * currentZoom;
		zoomFactor = Math.pow(2, currentZoom-1);

		window.regions[i].domElement.style.left = window.regions[i].coordinatePlot[0] * zoomFactor;
		window.regions[i].domElement.style.top = window.regions[i].coordinatePlot[1] * zoomFactor;
		window.regions[i].domElement.style.minWidth = window.regions[i].dimensions[0] * zoomFactor;
		window.regions[i].domElement.style.minHeight = window.regions[i].dimensions[1] * zoomFactor;
		window.regions[i].regionDOM.style.minWidth = window.regions[i].dimensions[0] * zoomFactor;
		window.regions[i].regionDOM.style.minHeight = window.regions[i].dimensions[1] * zoomFactor;
		window.regions[i].regionDOM.width = window.regions[i].dimensions[0] * zoomFactor;
		window.regions[i].regionDOM.height = window.regions[i].dimensions[1] * zoomFactor;
		window.regions[i].pin.style.left = ((window.regions[i].coordinateInteraction[0] * zoomFactor) - window.regions[i].pin.width/2) + "px";
		window.regions[i].pin.style.top = ((window.regions[i].coordinateInteraction[1] * zoomFactor) - window.regions[i].pin.height) + "px";
	}

	//update all pins to reflect data displayed:
	mapCheckPinStatus(0);

	//	change connections DOM to match zoomlevel, move accordingly.
	for(i=0; i<window.connections.length; i++)
	{
		window.connections[i].domElement.style.left = (window.connections[i].coordinatePlot[0] * zoomFactor) + "px";
		window.connections[i].domElement.style.top = (window.connections[i].coordinatePlot[1] * zoomFactor) + "px";
		window.connections[i].domElement.width = (window.connections[i].dimensions[0] * zoomFactor) + "px";
		window.connections[i].domElement.height = (window.connections[i].dimensions[1] * zoomFactor) + "px";
		window.connections[i].domElement.style.minWidth = (window.connections[i].dimensions[0] * zoomFactor) + "px";
		window.connections[i].domElement.style.minHeight = (window.connections[i].dimensions[1] * zoomFactor) + "px";
	}

	//move dialog box if visible
	var mapData = document.getElementById('mapData');
	if(mapData.style.display != "none")
	{
		mapData.style.left = (mapData.region.coordinatePlot[0] * zoomFactor) + "px";
		mapData.style.top = (mapData.region.coordinatePlot[1] * zoomFactor - 250) + "px";
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


function mapCheckPinStatus(regionID)
{
	console.log("in mapCheckPinStatus(): ");
	for(var j=0; j<window.regions.length; j++)
	{
		var thisRegion = window.regions[j];
		hasConnections = hasMolecules = hasCells = 0;
		for(var i=0; i<window.connections.length; i++)
		{
			var thisConnection = window.connections[i];
			if((thisConnection.sourceID == thisRegion.bamsID || thisConnection.targetID == thisRegion.bamsID) && (thisConnection.layer == window.layerData[0]))
			{
				hasConnections++;
			}
		}

		
		for(var i=0; i<window.molecules.length; i++)
		{
			var thisMolecule = window.molecules[i];
			if((thisMolecule.regionID == thisRegion.bamsID) && (thisMolecule.layer == window.layerData[0]))
			{
				hasMolecules++;
			}
		}

		for(var i=0; i<window.cells.length; i++)
		{
			var thisCell = window.cells[i];
			if((thisCell.regionID == thisRegion.bamsID) && (thisCell.layer == window.layerData[0]))
			{
				hasCells++;
			}
		}

		var pin = "img/ui/pin/2_r";
		var pinTitle = thisRegion.name + ": ";
		
		if(hasConnections > 0)
		{
			pin = pin + "_x";
			pinTitle = pinTitle + " " + hasConnections + " connections ";
		}

		if(hasCells > 0)
		{
			pin = pin + "_c";
			pinTitle = pinTitle + " " + hasCells + " cells";
		}

		if(hasMolecules > 0)
		{
			pin = pin + "_m";
			pinTitle = pinTitle + " " + hasMolecules + " molecules";
		}

		pin = pin + ".png";
		console.log(pin);

		document.getElementById(window.layerData[0] + "_" + thisRegion.bamsID).src = pin;
		document.getElementById(window.layerData[0] + "_" + thisRegion.bamsID).title = pinTitle;
	}
}


changeZoom(2, "init");