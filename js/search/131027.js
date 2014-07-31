//window.searchResults contains instantiated region, connection, molecule, or cell type objects that were returned from a user search and its interactions with the database
window.searchResults = [];
//window.searchable contains a list of all searchable terms. This will probably need to be contained in a separate file (it will get unruly large)
window.searchable = ["Nucleus Accumbens (ACB)", "Olfactory Nucleus", "Nucleus Ambiguens"];

//found a match in previously searched for data items
			//FOR LWS:
			//	instantiate the ACB. For now I pass in variables, soon this will be a JSON object that was returned from an AJAX .GET call
	window.searchResults[window.searchResults.length] = new Region("001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", 4, 3, "some coordinate pairs", [238.616, 438], "some previous notes about the ACB left from a prior session", "searchResults");

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

	for(i=0; i<window.searchResults.length; i++)
	{
		if(window.searchResults[i].getSearchTerm() == document.getElementById('searchInput').value)
		{
			
			if(window.searchResults[i].getSearchTerm() == "Nucleus Accumbens (ACB)")
			{
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

			}
			
		}
	}

	$('#searchResultsDiv').fadeIn(250);
}

function closeSearch()
{
	$('#searchResultsDiv').fadeOut(0);	
}

function addRegion()
{
	//retrieve Region object from search interface DOM (see line 52)
	//instantiate new Region object as most recent member of window.regions[] (see line 9)
	//region constructor needs test statement for whether or not to create DOM <img> object, create if called from here and not from search()
	alert(document.getElementById('searchResultsDiv').currentResult);

}