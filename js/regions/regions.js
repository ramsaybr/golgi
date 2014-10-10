//array that all region objects are stored in
window.regions = [];

//Region 'class' constructor function
function Region(bamsID, name, abbreviation, nomenclature, species, otherNomenclatures, dataSets, coordinateInteraction, dimensions, coordinatePlot, notes, destination, otherLayers)
{
	console.log("New Region initializing. Abbrev: " + abbreviation + ", destination: " + destination);

	//declare properties, set from construction arguments
	this.type = "Brain Region";
	this.bamsID = bamsID;
	this.name = name;
	this.abbrev = abbreviation;
	this.searchTerm = name + " (" + abbreviation + ")";
	this.nomenclature = nomenclature;
	this.species = species;
	this.otherNomenclatures = otherNomenclatures;
	this.dataSets = dataSets;
	this.layer = window.layerData[0];
	this.coordinateInteraction = coordinateInteraction;
	this.dimensions = dimensions;
	this.coordinatePlot = coordinatePlot;
	this.fileToDraw1 = "img/regions/zoom1/" + this.abbrev + ".svg";
	
	//the new region object's ID depend on which array it is added to: is it a searchResult, or a real region to be added to the map?
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
		this.id = window.regions.length;
		this.connections = [];
		this.molecules = [];
		this.cells = [];
		this.notes = notes;
		
		this.domElement = document.createElement('div');
		this.domElement.style.position = "absolute";

		this.regionDOM = document.createElement('img');
		this.regionDOM.src=this.fileToDraw1;
		
		this.pin = document.createElement('img');
		this.pin.id = window.layerData[0] + "_" + this.bamsID;

		this.pin.src = "img/ui/pin/" + window.currentZoom + "_r.png";
		this.pin.width = 10 * window.currentZoom;
		this.pin.height = 30 * window.currentZoom;
		thisZoom = Math.pow(2, window.currentZoom-1);
		

		this.domElement.style.left = (this.coordinatePlot[0] * thisZoom) + "px";
		this.domElement.style.top = (this.coordinatePlot[1] * thisZoom) + "px";
		this.domElement.style.minWidth = (this.dimensions[0] * thisZoom) + "px";
		this.domElement.style.minHeight = (this.dimensions[1] * thisZoom) + "px";
		this.regionDOM.width = this.dimensions[0] * thisZoom;
		this.regionDOM.height = this.dimensions[1] * thisZoom;
		this.pin.style.left = ((this.coordinateInteraction[0] * thisZoom) - this.pin.width/2 )+ "px";
		this.pin.style.top = ((this.coordinateInteraction[1] * thisZoom) - this.pin.height) + "px";

		this.domElement.title=this.searchTerm;
		var thisRegion = this;

		this.pin.style.position = "absolute";
		this.pin.style.zIndex = 20;
		this.pin.style.cursor="pointer";
		$(this.pin).addClass('layer' + this.layer + ' pin');
		this.pin.onclick=function(){clickedRegion(thisRegion);};
		
		this.domElement.appendChild(this.regionDOM);
		document.getElementById('pins').appendChild(this.pin);


		
		$(this.domElement).addClass('layer' + this.layer + ' region zoom' + window.currentZoom);

		
		//update layer information
		//get current number of regions in this layer
		(window.layerData[1][this.layer].numRegions)++;
		

		document.getElementById('layer' + this.layer + 'RegionList').innerHTML = (window.layerData[1][this.layer].numRegions) + " Regions";

		document.getElementById('regions').appendChild(this.domElement);

	}
}

function clickedRegion(region)
{
	if(typeof region == "object")
	{
		document.getElementById('mapData').region = region;
	}
	else
	{
		document.getElementById('mapData').region = window.regions[region];
	}
	mapDataOpen();
}