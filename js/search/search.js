//window.searchResults contains instantiated region, connection, molecule, or cell type objects that were returned from a user search and its interactions with the database. 

//131119: Once a region has been added, an AJAX call should be made to pull up its input/output connections, cells, and molecules and place them in searchResults for faster return when the user wants them
window.searchResults = [];
//window.searchable contains a list of all searchable terms. This will probably need to be contained in a separate file (it will get unruly large)
// window.searchable = ["Nucleus Accumbens (ACB)", "Infralimbic Area (ILA)", "Substantia Innominata, dorsomedial tip receiving region (SIdmtr)", "Lateral Hypothalamic Area, anterior region intermediate zone (LHAai)", "Interfascicular Nucleus (IF)", "Dorsal Raphe Nucleus (DR)", "Caudoputamen (CP)", "Globus Pallidus, external segment (GPe)", "Globus Pallidus, internal segment (GPi)", "Primary Motor Cortex (MOp)", "Substantia Nigra pars reticula (SNr)", "Substantia Nigra pars compacta (SNc)", "Subthalamic Nucleus (STN)", "Ventral anterior lateral Thalamus (VAl)", "Motor system, spinal cord (MOT)"];

window.searchable = [];

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

function search(mapValue)
{
	//check if this item is in searchResults[]
	//if it is not, make AJAX $.GET to retrieve it.
	//	process JSON, instantiate new Region() object into searchResults['regions']
	//	update Search Results DOM with new data. Set transient DOM properties preparing for further user interaction (ie: adding the region to the map, querying for connections, molecules, cells, other nomenclatures..)

	//...some sweet AJAX is happening right here...
	if(document.getElementById('searchInput').value != "" && document.getElementById('searchInput').value != "Search to add data to the map")
	{
		
		var url1 = document.getElementById('searchInput').value.split("(");
		var	url2 = url1[1].split(")");
		var url = "api/v1/nomenclature/1/region/" + url2[0];

		//make API call to find region
		xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function()
		{
			if (xmlHttp.readyState==4 && xmlHttp.status==200)
			{
				console.log("in search: region raw response: " + xmlHttp.responseText);
				//unpack JSON response
				//make new searchResults[] object, add to searchResults
				var newResult = JSON.parse(xmlHttp.responseText);
				switch(newResult.type)
				{
					case "Region":
						console.log("in search: making newObject for region (searchResults)");
						var newObject = new Region(newResult.bamsID, newResult.name, newResult.abbreviation, newResult.nomenclature, newResult.species, newResult.otherNomenclatures, newResult.dataSets, newResult.coordinateInteraction, newResult.dimensions, newResult.coordinatePlot, newResult.notes, "searchResults", false);
						break;
					case "Connection":
						break;
				}

				window.searchResults[window.searchResults.length] = newObject;
				var newIndex = window.searchResults.length-1;
				var i = newIndex;
				$('#searchResultsName').html(window.searchResults[i].name);
				$('#searchResultsType').html(window.searchResults[i].type + ", " + window.searchResults[i].nomenclature + " (" + window.searchResults[i].species + ")");
				$('#searchOtherResults').html("Also found in <a>" + window.searchResults[i].otherNomenclatures + "</a> other nomenclatures");
				$('#searchAddToMapBtn').html("Add " + window.searchResults[i].abbrev + " to the Map");
				$('#searhcFoundNumber').html(window.searchResults[i].dataSets.length);
				$('#searchFoundName').html(window.searchResults[i].abbrev);
				document.getElementById('searchResultsDiv').currentResult = window.searchResults[i];

				//if search returned a Region, find its connections
				if(newResult.type == "Region")
				{
					console.log("in search: calling API for connections");
					xmlHttp2 = new XMLHttpRequest();
					xmlHttp2.onreadystatechange = function()
					{
						if (xmlHttp2.readyState==4 && xmlHttp2.status==200)
						{
							console.log("in search: connection raw response: " + xmlHttp2.responseText);
							var Response = JSON.parse(xmlHttp2.responseText);
							for(i=0; i<Response.length; i++)
							{
								CnxResponse = Response[i];
								console.log("in search: creating new connection");
								window.searchResults[window.searchResults.length] = new Connection(CnxResponse.bamsID, CnxResponse.sourceID, CnxResponse.sourceName, CnxResponse.sourceAbbrev, CnxResponse.targetID, CnxResponse.targetName, CnxResponse.targetAbbrev, CnxResponse.nomenclature, CnxResponse.species, CnxResponse.dimensions, CnxResponse.coordinatePlot, CnxResponse.notes, CnxResponse.evidence, "searchResults", false);
							}
						}
					};
					var cnxUrl = "api/v1/nomenclature/1/region/" + url2[0] + "/connection/";
					xmlHttp2.open("GET",cnxUrl,false);
					xmlHttp2.send();
				}

			}
		};
		//find abbreviation
		xmlHttp.open("GET",url,false);
		xmlHttp.send();

		// $('#searchResultsDiv').fadeIn(250);
		$('#intxn').animate({left:'+=400'}, 500);
		$('#searchResultsDiv').animate({left:'0px'}, 500);
	}
}

function searchFromMap(mapValue)
{
	console.log("in searchFromMap: passed in " + mapValue);
	var url = "api/v1/nomenclature/1/region/" + mapValue;

	//loop and make sure that thsi region doesnt already exist
	var found = 0;
	for(i=0; i<window.searchResults.length;i++)
	{
		if(window.searchResults[i].type == "Brain Region")
		{
			if(window.searchResults[i].abbrev == mapValue)
			{
				found++;
			}
		}
	}
	console.log("in searchFromMap: searched for " + mapValue + " in existing records, found " + found + " matches");
	if(found == 0)
	{
		console.log("in searchFromMap: calling API for region");
		//make API call to find region
		xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function()
		{
			console.log("in searchFromMap: result from server");
			if (xmlHttp.readyState==4 && xmlHttp.status==200)
			{
				console.log("in searchFromMap: Raw Response: " + xmlHttp.responseText);
				//unpack JSON response
				//make new searchResults[] object, add to searchResults
				var newResult = JSON.parse(xmlHttp.responseText);
				switch(newResult.type)
				{
					case "Region":
						console.log("in searchFromMap: instantiating new region for direct display on the map");
						var newObject = new Region(newResult.bamsID, newResult.name, newResult.abbreviation, newResult.nomenclature, newResult.species, newResult.otherNomenclatures, newResult.dataSets, newResult.coordinateInteraction, newResult.dimensions, newResult.coordinatePlot, newResult.notes, "regions", false);
							window.regions[window.regions.length] = newObject;
						break;
					case "Connection":
						break;
				}

				console.log("in searchFromMap: adding new result to searchResults");

				window.searchResults[window.searchResults.length] = newObject;
				var newIndex = window.searchResults.length-1;
				var i = newIndex;
				document.getElementById('searchResultsDiv').currentResult = window.searchResults[i];

				//if search returned a Region, find its connections
				if(newResult.type == "Region")
				{
					console.log("in searchFromMap: calling API for connections");
					xmlHttp2 = new XMLHttpRequest();
					xmlHttp2.onreadystatechange = function()
					{
						if (xmlHttp2.readyState==4 && xmlHttp2.status==200)
						{
							console.log(xmlHttp2.responseText);
							var Response = JSON.parse(xmlHttp2.responseText);
							for(i=0; i<Response.length; i++)
							{
								// console.log("Response length:" + Response.length);
								// console.log("Currently on: " + i);
								CnxResponse = Response[i];
								// console.log("Creating new searchResult");
								var foundCnx = 0;
								// console.log("looking for connections");
								for(j=0; j<window.searchResults.length;j++)
								{
									if(window.searchResults[j].type == "Connection")
									{
										// console.log("examining " + j);
										if(window.searchResults[j].bamsID == CnxResponse.bamsID)
										{
											// console.log("found duplicate: " + CnxResponse.bamsID);
											foundCnx++;
										}
									}
								}
								if(foundCnx == 0)
								{
									window.searchResults[window.searchResults.length] = new Connection(CnxResponse.bamsID, CnxResponse.sourceID, CnxResponse.sourceName, CnxResponse.sourceAbbrev, CnxResponse.targetID, CnxResponse.targetName, CnxResponse.targetAbbrev, CnxResponse.nomenclature, CnxResponse.species, CnxResponse.dimensions, CnxResponse.coordinatePlot, CnxResponse.notes, CnxResponse.evidence, "searchResults", false);
								}
							}
						}
					};
					var cnxUrl = "api/v1/nomenclature/1/region/" + mapValue + "/connection/";
					xmlHttp2.open("GET",cnxUrl,false);
					xmlHttp2.send();
				}
			}
		};
		console.log("in searchFromMap: about to call server");
		//find abbreviation
		xmlHttp.open("GET",url,false);
		xmlHttp.send();
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