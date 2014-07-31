//window.searchResults contains instantiated region, connection, molecule, or cell type objects that were returned from a user search and its interactions with the database. 

//131119: Once a region has been added, an AJAX call should be made to pull up its input/output connections, cells, and molecules and place them in searchResults for faster return when the user wants them
window.searchResults = [];
//window.searchable contains a list of all searchable terms. This will probably need to be contained in a separate file (it will get unruly large)
window.searchable = ["Nucleus Accumbens (ACB)", "Infralimbic Area (ILA)", "Substantia Innominata, dorsomedial tip receiving region (SIdmtr)", "Lateral Hypothalamic Area, anterior region intermediate zone (LHAai)", "Interfascicular Nucleus (IF)", "Dorsal Raphe Nucleus (DR)"];

//found a match in previously searched for data items
			//FOR LWS:
			//	instantiate the ACB. For now I pass in variables, soon this will be a JSON object that was returned from an AJAX .GET call
	window.searchResults[window.searchResults.length] = new Region("001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", 0, 3, "some coords", [[26,30], [50,58], [99,115], [197,229]], [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the ACB left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("002", "Infralimbic Area", "ILA", "Swanson 2003", "rat", 0, 3, "some coords", [[65,49], [128,97], [252,194], [505,388]], [[174.61, 419.09], [332,843.92], [702.436,1672.348], [1409.873, 3349.695]], "some previous notes about the ILA left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("003", "Substantia Innominata", "SI", "Swanson 2003", "rat", 0, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]], [[258.667, 390.611], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the SI left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("004", "Lateral Hypothalamic Area, anterior region intermediate zone", "LHAai", "Swanson 2003", "rat", 0, 3, "some coords", [[33,7], [66,14], [132,28], [263,55]], [[299.406, 439.401], [580.813,885.552], [1197.625,1757.604], [2400.25, 3520.208]], "some previous notes about the LHAai left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("005", "Interfascicular Nucleus", "IF", "Swanson 2003", "rat", 0, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]],  [[393.781, 436.781], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the IF left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("006", "Dorsal Raphe Nucleus", "DR", "Swanson 2003", "rat", 0, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]],  [[427.142, 427.459], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the DR left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("007", "Basomedial Nucleus of the Amygdala, anterior part", "BMAa", "Swanson 2003", "rat", 4, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]],  [[346.813, 361.18], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the BMAa left from a prior session", "searchResults", false);
	window.searchResults[window.searchResults.length] = new Region("008", "Subiculum, Ventral Part", "SUBv", "Swanson 2003", "rat", 0, 3, "some coords", [[238.616, 438], [459,882.75], [954.15,1752], [1913.3, 3509]],  [[336.317, 305.129], [459,882.75], [954.15,1752], [1913.3, 3509]], "some previous notes about the SUBv left from a prior session", "searchResults", false);


//instantiate connections
//Connection(bamsID, sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbreb, nomenclature, species, coordinateInteraction, coordinatePlot, notes, destination, otherLayers)

//ConnectionEvidence(sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, strength, injectionLocation, terminalFieldLocation, technique, annotation, curator, referenceName, referenceURL)

	window.searchResults[window.searchResults.length] = new Connection("009", "001", "Nucleus Accumbens", "ACB", "003", "Substantia Innominata", "SI", "Swanson 2003", "rat", "interaction", [[34,25],[2,2],[3,3],[4,4]], [[248.75,431.423],[2,2],[3,3],[4,4]], "some notes about ACB>SI", [new ConnectionEvidence("001", "Nucleus Accumbens", "ACB", "003", "Substantia Innominata", "SI", "Swanson 2003", "some strength", "some injectionLocation", "some terminalFieldLocation", "PHAL", "some annotation", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);
	window.searchResults[window.searchResults.length] = new Connection("010", "002", "Infralimbic Area", "ILA", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", "interaction", [[73.78,44.53],[147.567,89.063],[295.134,178.125],[590.268,356.25]], [[175.267,421.596],[332.894,848.813],[699.788,1685.937],[1409.775,3377.873]], "some notes about ILA>ACB", [new ConnectionEvidence("002", "Infralimbic Area", "ILA", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "some strength", "some injectionLocation", "some terminalFieldLocation", "PHAL", "some annotation", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);
	window.searchResults[window.searchResults.length] = new Connection("011", "001", "Nucleus Accumbens", "ACB", "004", "Lateral Hypothalamic Area, anterior region intermediate zone", "LHAai", "Swanson 2003", "rat", "interaction", [[72,15],[139.445,26.961],[281.36,53.921],[576.508,107.947]], [[248,439.717],[479.974,889.507],[991.479,1767.325],[1989.276,3541.546]], "some notes about ACB>LHAai", [new ConnectionEvidence("001", "Nucleus Accumbens", "ACB", "004", "Lateral Hypothalamic Area, anterior region intermediate zone", "LHAai", "Swanson 2003", "Strong", "ACB", "LHAai", "PHAL", "See Figure 2", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf"), new ConnectionEvidence("001", "Nucleus Accumbens", "ACB", "004", "Lateral Hypothalamic Area, anterior region intermediate zone", "LHAai", "Swanson 2003", "Medium", "LHAai", "ACB", "CTb", "See Figure 3", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);
	window.searchResults[window.searchResults.length] = new Connection("012", "007", "Basomedial Nucleus of the Amygdala, anterior part", "BMAa", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", "interaction", [[114,81],[2,2],[3,3],[4,4]], [[254.628,371.196],[2,2],[3,3],[4,4]], "some notes about BMAa>ACB", [new ConnectionEvidence("006", "Basomedial Nucleus of the Amygdala, anterior part", "BMAa", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "some strength", "some injectionLocation", "some terminalFieldLocation", "PHAL", "some annotation", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);
	window.searchResults[window.searchResults.length] = new Connection("013", "008", "Subiculum, ventral part", "SUBv", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", "interaction", [[141,77],[2,2],[3,3],[4,4]], [[254.628,374.608],[2,2],[3,3],[4,4]], "some notes about SUBv>ACB", [new ConnectionEvidence("008", "Subiculum, ventral part", "SUBv", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "some strength", "some injectionLocation", "some terminalFieldLocation", "PHAL", "some annotation", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);
	window.searchResults[window.searchResults.length] = new Connection("014", "006", "Dorsal Raphe Nucleus", "DR", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", "interaction", [[185,31],[2,2],[3,3],[4,4]], [[252.422,427.577],[2,2],[3,3],[4,4]], "some notes about DR>ACB", [new ConnectionEvidence("006", "Dorsal Raphe Nucleus", "DR", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "some strength", "some injectionLocation", "some terminalFieldLocation", "PHAL", "some annotation", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);
	window.searchResults[window.searchResults.length] = new Connection("015", "005", "Interfascicular Nucleus", "IF", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "rat", "interaction", [[148,19],[2,2],[3,3],[4,4]], [[252.035,438.303],[2,2],[3,3],[4,4]], "some notes about IF>ACB", [new ConnectionEvidence("005", "Interfascicular Nucleus", "IF", "001", "Nucleus Accumbens", "ACB", "Swanson 2003", "some strength", "some injectionLocation", "some terminalFieldLocation", "PHAL", "some annotation", "RA Brown", "Hypothesis-driven structural connectivity analysis supports network over hierarchical model of brain architecture", "http://www.uvm.edu/~pdodds/teaching/courses/2009-08UVM-300/docs/others/2010/thompson2010b.pdf")], "searchResults", false);


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

					//how many connections associated with this region?
					var numConnections = 0;
					for(j=0; j<window.searchResults.length; j++)
					{
						if(window.searchResults[j].type == "Connection" && (window.searchResults[j].sourceID == window.searchResults[i].bamsID || window.searchResults[j].targetID == window.searchResults[i].bamsID && window.searchResults[j].nomenclature == window.searchResults[i].nomenclature))
						{
							numConnections++;
						}
					}
					$('#searchConnectionBtn').html("View " + numConnections + " Connections");
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
	closeSearch();
	//retrieve Region object from search interface DOM (see line 52)
	//instantiate new Region object as most recent member of window.regions[] (see line 9)
	//region constructor needs test statement for whether or not to create DOM <img> object, create if called from here and not from search()
	//retrieve region attached to searchResultsDiv DOM element: this is the currently searched region
	newRegion = document.getElementById('searchResultsDiv').currentResult;
	
	//only instantiate the region if it is not already active in this layer or any other layer
	var sameLayer = false;
	var sameLayerIndex = 0;
	var otherLayer = false;
	var otherLayers = [];
	for(i=0; i<window.regions.length; i++)
	{
		if((window.regions[i].name == newRegion.name)&&(window.regions[i].nomenclature == newRegion.nomenclature)&&(window.regions[i].layer == window.layerData[0]))
		{
			//it is already in this layer
			sameLayer = true;
			sameLayerIndex = i;
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
		return sameLayerIndex;
	}
	else
	{
		//instantiate new region object in window.regions[]
		//pass otherLayer to constructor to determine whether or not to add DOM element for region <img>
		var instantiatedRegion = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", otherLayers);
		window.regions[window.regions.length] = instantiatedRegion;
		return instantiatedRegion;
	}
	
}

function searchViewCnxs()
{
	//hide searchResultsDiv
	//closeSearch();
	clickedRegion(addRegion());
	mapDataAddData();
	mapDataAddConnections();
}























