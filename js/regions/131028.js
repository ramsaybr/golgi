//array that all region objects are stored in
window.regions = [];

//Region 'class' constructor function
function Region(bamsID, name, abbreviation, nomenclature, species, otherNomenclatures, dataSets, coordinateInteraction, coordinatePlot, notes, destination, otherLayers)
{

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
	this.coordinatePlot = coordinatePlot;
	this.fileToDraw1 = "img/regions/zoom1/" + this.abbrev + ".png";
	this.fileToDraw2 = "img/regions/zoom2/" + this.abbrev + ".png";
	this.fileToDraw3 = "img/regions/zoom3/" + this.abbrev + ".png";
	this.fileToDraw4 = "img/regions/zoom4/" + this.abbrev + ".png";
	console.log(this.fileToDraw);
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
		this.domElement.title=this.searchTerm;
		var thisRegion = this;
		this.domElement.onclick=function(){clickedRegion(thisRegion);};
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
	document.getElementById('mapData').region = region;
	mapDataOpen();
}