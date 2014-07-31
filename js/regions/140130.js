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
	this.fileToDraw2 = "img/regions/zoom2/" + this.abbrev + ".png";
	this.fileToDraw3 = "img/regions/zoom3/" + this.abbrev + ".png";
	this.fileToDraw4 = "img/regions/zoom4/" + this.abbrev + ".png";
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
		var regionDOM = document.createElement('img');
		var pin = document.createElement('img');

		//set properties of DOM element
		
		switch(window.currentZoom)
		{
			case(1):
				regionDOM.src=this.fileToDraw1;
				pin.src = "img/ui/pin1.png";
				pin.width = "10";
				pin.height = "30";
				pin.style.left = ((this.dimensions[(window.currentZoom - 1)][0] / 2) - 5) + "px";
				pin.style.top = ((this.dimensions[(window.currentZoom - 1)][1] / 2) - 30) + "px";
			break;
			case(2):
				regionDOM.src=this.fileToDraw2;
				pin.src = "img/ui/pin2.png";
				pin.width = "20";
				pin.height = "60";
				pin.style.left = ((this.dimensions[(window.currentZoom - 1)][0] / 2) - 10) + "px";
				pin.style.top = ((this.dimensions[(window.currentZoom - 1)][1] / 2) - 60) + "px";
			break;
			case(3):
				this.domElement.src=this.fileToDraw3;
			break;
			case(4):
				this.domElement.src=this.fileToDraw4;
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

		pin.style.position = "absolute";
		pin.style.zIndex = 20;
		pin.style.cursor="pointer";
		pin.onclick=function(){clickedRegion(thisRegion);};
		this.domElement.appendChild(regionDOM);
		this.domElement.appendChild(pin);

		
		$(this.domElement).addClass('layer' + this.layer + ' region zoom' + window.currentZoom);
		
		//update layer information
		//get current number of regions in this layer
		var numRegions = (window.layerData[1][this.layer].numRegions)+1;
		document.getElementById('layer' + this.layer + 'RegionList').innerHTML = numRegions + " Regions";


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