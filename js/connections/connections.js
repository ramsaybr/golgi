//array that all region objects are stored in
window.connections = [];

//Connection 'class' constructor function
function Connection(bamsID, sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, species, dimensions, coordinatePlot, notes, evidence, destination, otherLayers)
{
	console.log("in connection constructor. New connection initializing");
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
	this.coordinatePlot = coordinatePlot;
	this.dimensions = dimensions;
	this.notes = notes;
	this.fileToDraw1 = "img/connections/zoom1/" + this.sourceAbbrev + "-" + this.targetAbbrev + ".svg";

	console.log(this);
	
	this.evidence = [];
	//instantiate evidence reports for this connection
	console.log("in connection constructor: creating new evidence report");
	// console.log()
	for(i=0; i<evidence.length; i++)
	{
		console.log("in connection constructor: in loop for evidence, i=" + i);
		thisReport = evidence[i];
		
		this.evidence[this.evidence.length] = new ConnectionEvidence(this.sourceID, this.sourceName, this.sourceAbbrev, this.targetID, this.targetName, this.targetAbbrev, this.nomenclature, thisReport.strengthID, thisReport.injectionSiteID, thisReport.terminalFieldID, thisReport.techniqueID, thisReport.annotation, thisReport.referenceName, thisReport.referenceURL, thisReport.detailsURL);
	}
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
		this.domElement.src=this.fileToDraw1;

		//set properties of DOM element
		switch(window.currentZoom)
		{
			case(1):
				var zoomFactor = 1;		
			break;
			case(2):
				var zoomFactor = 2;
			break;
			case(3):
				var zoomFactor = 4;
			break;
			case(4):
				var zoomFactor = 8;
			break;
		}

		this.domElement.style.left = (this.coordinatePlot[0] * zoomFactor) + "px";
		this.domElement.style.top = (this.coordinatePlot[1] * zoomFactor) + "px";
		this.domElement.width = (this.dimensions[0] * zoomFactor);
		this.domElement.height = (this.dimensions[1] * zoomFactor);
		this.domElement.style.minWidth = (this.dimensions[0] * zoomFactor) + "px";
		this.domElement.style.minHeight = (this.dimensions[1] * zoomFactor) + "px";
		
		$(this.domElement).addClass('layer' + this.layer + ' connection zoom' + window.currentZoom);
		
		//update layer information
		//get current number of regions in this layer
		window.layerData[1][this.layer].numConnection++;
		document.getElementById('layer' + this.layer + 'ConnectionList').innerHTML = (window.layerData[1][this.layer].numConnection) + " Connections";


		//only add the DOM element if it is not already present in another layer
		document.getElementById('connections').appendChild(this.domElement);
		// console.log(this);
	}
}

function clickedConnection(connection)
{
	document.getElementById('connectionDetail').connection = connection;
	connectionDetailOpen();
}