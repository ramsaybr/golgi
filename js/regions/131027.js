//array that all region objects are stored in
window.regions = [];

function Region(bamsID, name, abbreviation, nomenclature, species, otherNomenclatures, dataSets, coordinateInteraction, coordinatePlot, notes, destination)
{
	this.type = "Brain Region";
	this.bamsID = bamsID;
	this.name = name;
	this.abbrev = abbreviation;
	this.searchTerm = name + " (" + abbreviation + ")";
	this.nomenclature = nomenclature;
	this.species = species;
	this.otherNomenclatures = otherNomenclatures;
	this.dataSets = dataSets;
	this.layer = window.currentLayer;
	this.coordinateInteraction = coordinateInteraction;
	this.coordinatePlot = coordinatePlot;
	this.fileToDraw = "img/regions/zoom" + window.currentZoom + "/" + this.abbrev + ".png";
	if(destination == "searchResults")
	{
		this.objectID = window.searchResults.length;
	}
	else
	{
		this.objectID = window.regions.length;	
	}
	this.connections = [];
	this.molecules = [];
	this.cells = [];
	this.notes = notes;
	this.dom = document.createElement('div');
	alert(this.name + " created!");

	this.getSearchTerm = getSearchTerm;
	function getSearchTerm()
	{
		return this.searchTerm;
	}
}