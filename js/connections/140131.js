//array that all region objects are stored in
window.connections = [];

//Connection 'class' constructor function
function Connection(bamsID, sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, species, coordinateInteraction, dimensions, coordinatePlot, notes, evidence, destination, otherLayers)
{
	console.log("New connection initializing");

	//declare properties, set from construction arguments
	this.type = "Connection";
	this.bamsID = bamsID;
	this.sourceID = sourceID;
	this.sourceName = sourceName;
	this.sourceAbbrev = sourceAbbrev;
	this.targetID = targetID;
	this.targetName = targetName;
	this.targetAbbrev = targetAbbrev;
	this.nomenclature = nomenclature;
	this.species = species;
	this.searchTerm = this.sourceAbbrev + ">" + this.targetAbbrev;
	this.layer = window.layerData[0];
	//do we still need coordinateInteraction?
	this.coordinateInteraction = coordinateInteraction;
	this.coordinatePlot = coordinatePlot;
	this.dimensions = dimensions;
	this.fileToDraw1 = "img/connections/zoom1/" + this.sourceAbbrev + "-" + this.targetAbbrev + ".svg";
	this.fileToDraw2 = "img/connections/zoom2/" + this.sourceAbbrev + "-" + this.targetAbbrev + ".svg";
	this.fileToDraw3 = "img/connections/zoom3/" + this.sourceAbbrev + "-" + this.targetAbbrev + ".svg";
	this.fileToDraw4 = "img/connections/zoom4/" + this.sourceAbbrev + "-" + this.targetAbbrev + ".svg";
	
	this.evidence = evidence;
	//the new connection object's ID depends on which array it is added to: is it a searchResult, or a real connection to be added to the map?
	if(destination == "searchResults")
	{
		this.objectID = window.searchResults.length;
		this.getSearchTerm = getSearchTerm;
		function getSearchTerm()
		{
			return this.searchTerm;
		}
	}
	else
	{
		this.id = window.connections.length;
		this.notes = notes;
		this.domElement = document.createElement('img');
		
		//set properties of DOM element
		switch(window.currentZoom)
		{
			case(1):
				this.domElement.src=this.fileToDraw1;
			break;
			case(2):
				this.domElement.src=this.fileToDraw2;
			break;
			case(3):
				this.domElement.src=this.fileToDraw3;
			break;
			case(4):
				this.domElement.src=this.fileToDraw4;
			break;
		}
		var thisZoom = window.currentZoom - 1;
		this.domElement.style.left = this.coordinatePlot[thisZoom][0] + "px";
		this.domElement.style.top = this.coordinatePlot[thisZoom][1] + "px";
		this.domElement.width = this.dimensions[thisZoom][0];
		this.domElement.height = this.dimensions[thisZoom][1];
		this.domElement.style.minWidth = this.dimensions[thisZoom][0] + "px";
		this.domElement.style.minHeight = this.dimensions[thisZoom][1] + "px";
		// this.domElement.title=this.searchTerm;
		// var thisRegion = this;
		// this.domElement.onclick=function(){clickedRegion(thisRegion);};
		$(this.domElement).addClass('layer' + this.layer + ' connection zoom' + window.currentZoom);
		
		//update layer information
		//get current number of regions in this layer
		window.layerData[1][this.layer].numConnection++;
		document.getElementById('layer' + this.layer + 'ConnectionList').innerHTML = (window.layerData[1][this.layer].numConnection) + " Connections";


		//only add the DOM element if it is not already present in another layer
		document.getElementById('connections').appendChild(this.domElement);
		console.log(this);
		
	}

}

function clickedConnection(connection)
{
	document.getElementById('connectionDetail').connection = connection;
	connectionDetailOpen();
}