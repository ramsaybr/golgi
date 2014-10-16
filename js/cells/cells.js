//array that all molecule objects are stored in
window.cells = [];

//Molecule 'class' constructor function
function Cell(bamsID, name, regionID, regionName, regionAbbrev, detailsURL, destination, otherLayers)
{

	console.log("in cell constructor. New cell initializing");
	//declare properties, set from construction arguments
	this.type = "Cell";
	this.bamsID = bamsID;
	this.name = name;
	this.regionID = regionID;
	this.regionName = regionName;
	this.regionAbbrev = regionAbbrev;
	this.detailsURL = detailsURL;
	this.layer = window.layerData[0];
	//do we still need coordinateInteraction?
	
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
		this.id = window.cells.length;
	}
}