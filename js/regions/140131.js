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
	this.fileToDraw2 = "img/regions/zoom2/" + this.abbrev + ".svg";
	this.fileToDraw3 = "img/regions/zoom3/" + this.abbrev + ".svg";
	this.fileToDraw4 = "img/regions/zoom4/" + this.abbrev + ".svg";
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
		this.regionDOM = document.createElement('img');
		this.pin = document.createElement('img');

		//set properties of DOM element
		
		switch(window.currentZoom)
		{
			case(1):
				this.regionDOM.src=this.fileToDraw1;
				this.pin.src = "img/ui/pin1.png";
				this.pin.width = "10";
				this.pin.height = "30";
				this.pin.style.left = ((this.coordinatePlot[(window.currentZoom - 1)][0]) - 5) + "px";
				this.pin.style.top = ((this.coordinatePlot[(window.currentZoom - 1)][1]) - 30) + "px";
			break;
			case(2):
				this.regionDOM.src=this.fileToDraw2;
				this.pin.src = "img/ui/pin2.png";
				this.pin.width = "20";
				this.pin.height = "60";
				this.pin.style.left = ((this.coordinatePlot[(window.currentZoom - 1)][0]) + (this.dimensions[(window.currentZoom - 1)][0]/2 - 10)) + "px";
				this.pin.style.top = ((this.coordinatePlot[(window.currentZoom - 1)][1]) + (this.dimensions[(window.currentZoom - 1)][1]/2 - 60)) + "px";
			break;
			case(3):
				this.regionDOM.src=this.fileToDraw3;
				this.pin.src = "img/ui/pin3.png";
				this.pin.width = "30";
				this.pin.height = "90";
				this.pin.style.left = ((this.dimensions[(window.currentZoom - 1)][0] / 2) - 15) + "px";
				this.pin.style.top = ((this.dimensions[(window.currentZoom - 1)][1] / 2) - 90) + "px";
			break;
			case(4):
				this.regionDOM.src=this.fileToDraw4;
				this.pin.src = "img/ui/pin4.png";
				this.pin.width = "40";
				this.pin.height = "120";
				this.pin.style.left = ((this.dimensions[(window.currentZoom - 1)][0] / 2) - 20) + "px";
				this.pin.style.top = ((this.dimensions[(window.currentZoom - 1)][1] / 2) - 120) + "px";
			break;
		}
		
		var thisZoom = window.currentZoom - 1;
		this.domElement.style.position = "absolute";
		this.domElement.style.left = this.coordinatePlot[thisZoom][0] + "px";
		this.domElement.style.top = this.coordinatePlot[thisZoom][1] + "px";
		this.domElement.style.minWidth = this.dimensions[thisZoom][0] + "px";
		this.domElement.style.minHeight = this.dimensions[thisZoom][1] + "px";
		this.domElement.title=this.searchTerm;
		var thisRegion = this;

		this.pin.style.position = "absolute";
		this.pin.style.zIndex = 20;
		this.pin.style.cursor="pointer";
		
		this.pin.onclick=function(){clickedRegion(thisRegion);};
		
		this.domElement.appendChild(this.regionDOM);
		document.getElementById('pins').appendChild(this.pin);


		
		$(this.domElement).addClass('layer' + this.layer + ' region zoom' + window.currentZoom);
		
		//update layer information
		//get current number of regions in this layer
		(window.layerData[1][this.layer].numRegions)++;
		// var numRegions = (window.layerData[1][this.layer].numRegions)+1;
		document.getElementById('layer' + this.layer + 'RegionList').innerHTML = (window.layerData[1][this.layer].numRegions) + " Regions";


		//only add the DOM element if it is not already present in another layer
		// if(otherLayer.length === 0)
		// {
			//should check if the current layer is visible
			//flag style.display:none
		


		document.getElementById('regions').appendChild(this.domElement);
		// }
		// else
		// {
		// 	//this region is present in at least one other layer. If that layer is not visible,
		// }
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