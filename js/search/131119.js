//window.searchResults contains instantiated region, connection, molecule, or cell type objects that were returned from a user search and its interactions with the database. 

//131119: Once a region has been added, an AJAX call should be made to pull up its input/output connections, cells, and molecules and place them in searchResults for faster return when the user wants them
window.searchResults = [];
//window.searchable contains a list of all searchable terms. This will probably need to be contained in a separate file (it will get unruly large)
window.searchable = ["Nucleus Accumbens (ACB)", "Infralimbic Area (ILA)", "Substantia Innominata, dorsomedial tip receiving region (SIdmtr)", "Lateral Hypothalamic Area, anterior region (LHAa)", "Interfascicular Nucleus (IF)", "Dorsal Raphe Nucleus (DR)"];

//found a match in previously searched for data items
			//FOR LWS:
			//	instantiate the ACB. For now I pass in variables, soon this will be a JSON object that was returned from an AJAX .GET call
	window.searchResults[window.searchResults.length] = new Region("001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the ACB left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("002", "Infralimbic Area", "ILA", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the ILA left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("003", "Substantia Innominata, dorsomedial tip receiving region", "SIdmtr", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the SIdmtr left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("004", "Lateral Hypothalamic Area, anterior region", "LHAa", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the LHAa left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("005", "Interfascicular Nucleus", "IF", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the IF left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("006", "Dorsal Raphe Nucleus", "DR", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the DR left from a prior session", "searchResults", false);


//jQuery for bootstrap typeahead
$('#searchInput').typeahead({
	source: searchable
});

function clearSearch()
{
	if(document.getElementById('searchInput').value == "Search to add data to the map")
	{
		document.getElementById('searchInput').value="";
	}
}

function search()
{
	//check if this item is in searchResults[]
	//if it is not, make AJAX $.GET to retrieve it.
	//	process JSON, instantiate new Region() object into searchResults['regions']
	//	update Search Results DOM with new data. Set transient DOM properties preparing for further user interaction (ie: adding the region to the map, querying for connections, molecules, cells, other nomenclatures..)

	//...some sweet AJAX is happening right here...
	if(document.getElementById('searchInput').value != "" && document.getElementById('searchInput').value != "Search to add data to the map")
	{
		for(i=0; i<window.searchResults.length; i++)
		{
			if(window.searchResults[i].getSearchTerm() == document.getElementById('searchInput').value)
			{
				
				// if(window.searchResults[i].getSearchTerm() == "Nucleus Accumbens (ACB)")
				// {
					$('#searchResultsName').html(window.searchResults[i].name);
					$('#searchResultsType').html(window.searchResults[i].type + ", " + window.searchResults[i].nomenclature + " (" + window.searchResults[i].species + ")");
					$('#searchOtherResults').html("Also found in <a>" + window.searchResults[i].otherNomenclatures + "</a> other nomenclatures");
					$('#searchAddToMapBtn').html("Add " + window.searchResults[i].abbrev + " to the Map");
					$('#searhcFoundNumber').html(window.searchResults[i].dataSets);
					$('#searchFoundName').html(window.searchResults[i].abbrev);

					//these should also pull down from the searchResults obj..
					$('#searchConnectionBtn').html("View 19 Output Connections");
					$('#searchMoleculesBtn').html("View 7 Molecules");
					$('#searchCellTypesBtn').html("View 4 Cell Types");
					
					//attach window.searchResults[i] to some DOM element in the search interface to hold onto it for a moment
					document.getElementById('searchResultsDiv').currentResult = window.searchResults[i];

				// }
				
			}
		}

		// $('#searchResultsDiv').fadeIn(250);
		$('#intxn').animate({left:'+=400'}, 500);
		$('#searchResultsDiv').animate({left:'0px'}, 500);
	}
}

function closeSearch()
{
	$('#intxn').animate({left:'-=400'}, 500);
	$('#searchResultsDiv').animate({left:'-410px'}, 500);	
}

function addRegion()
{

	//retrieve Region object from search interface DOM (see line 52)
	//instantiate new Region object as most recent member of window.regions[] (see line 9)
	//region constructor needs test statement for whether or not to create DOM <img> object, create if called from here and not from search()
	//retrieve region attached to searchResultsDiv DOM element: this is the currently searched region
	newRegion = document.getElementById('searchResultsDiv').currentResult;
	
	//only instantiate the region if it is not already active in this layer or any other layer
	var sameLayer = false;
	var otherLayer = false;
	var otherLayers = [];
	for(i=0; i<window.regions.length; i++)
	{
		if((window.regions[i].name == newRegion.name)&&(window.regions[i].nomenclature == newRegion.nomenclature)&&(window.regions[i].layer == window.layerData[0]))
		{
			//it is already in this layer
			sameLayer = true;
		}
		else if((window.regions[i].name == newRegion.name)&&(window.regions[i].nomenclature == newRegion.nomenclature))
		{
			//it is already in another layer
			otherLayer = true;
			otherLayers[otherLayers.length] = window.regions[i].layer;
			console.log('in other layer');
		}
	}
	if(sameLayer)
	{
		alert("This region is already in this layer!");
	}
	else
	{
		//instantiate new region object in window.regions[]
		//pass otherLayer to constructor to determine whether or not to add DOM element for region <img>
		window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.coordinatePlot, newRegion.notes, "regions", otherLayers);
	}
}



























