//array that all molecule objects are stored in
window.molecules = [];

//Molecule 'class' constructor function
function Molecule(bamsID, name, regionID, regionName, regionAbbrev, distribution, strength, annotation, referenceName, referenceURL, detailsURL, destination, otherLayers)
{

	console.log("in molecule constructor. New molecule initializing");
	//declare properties, set from construction arguments
	this.type = "Molecule";
	this.bamsID = bamsID;
	this.name = name;
	this.regionID = regionID;
	this.regionName = regionName;
	this.regionAbbrev = regionAbbrev;
	this.distribution = distribution;
	this.strength = strength;
	this.annotation = annotation;
	this.referenceName = referenceName;
	this.referenceURL = referenceURL;
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
		this.id = window.molecules.length;
	}
}

// function clickedConnection(connection)
// {
// 	document.getElementById('connectionDetail').connection = connection;
// 	connectionDetailOpen();
// }