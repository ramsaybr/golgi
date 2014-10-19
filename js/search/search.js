window.searchResults = [];

window.searchOpen = false;

window.searchable = [];

//jQuery for bootstrap typeahead
$('#searchInput').typeahead({
	source: searchable,
	items: 20,
	minLength: 1
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

	if(document.getElementById('searchInput').value != "" && document.getElementById('searchInput').value != "Search to add data to the map")
	{
		document.getElementById('searchMyNotebookFlex').innerHTML = "";
		var url1 = document.getElementById('searchInput').value.split("(");
		var	url2 = url1[1].split(")");
		var url = "api/v1/nomenclature/1/region/" + url2[0];

		//has this region been previously searched for?
		var alreadyHere = false;
		var regionIndex = -1;
		for(var i=0; i<window.searchResults.length; i++)
		{
			if(window.searchResults[i].type=="Brain Region")
			{
				if(window.searchResults[i].abbrev == url2[0])
				{
					alreadyHere = true;
					regionIndex = i;
				}
			}
		}

		if(!(alreadyHere))
		{
			//make API call to find region
			xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function()
			{
				if (xmlHttp.readyState==4 && xmlHttp.status==200)
				{
					var newResult = JSON.parse(xmlHttp.responseText);
					switch(newResult.type)
					{
						case "Region":
							var newObject = new Region(newResult.bamsID, newResult.name, newResult.abbreviation, newResult.nomenclature, newResult.species, newResult.otherNomenclatures, newResult.dataSets, newResult.coordinateInteraction, newResult.dimensions, newResult.coordinatePlot, newResult.notes, "searchResults", false);

							if(window.logged)
							{
								$('#searchMyNotebookNew').show();
								$('#searchMyNotebookNewBtn').show();
								//display notes if stored
								for(var j=0; j<newResult.notes.length; j++)
								{
									var thisNote = newObject.notes[j];
									console.log(thisNote);
									var newNote = document.createElement('div');
									newNote.className = "searchMyNotebookItem";
									newNote.id = thisNote.id;
									newNote.innerHTML = "On " + thisNote.dateTime + ", you recorded: <br>" + thisNote.note;
									document.getElementById('searchMyNotebookFlex').appendChild(newNote);
								}	
							}
							else
							{
								var newNote = document.createElement('div');
								newNote.innerHTML = "<center><img src='img/brainMap.png' width='60' height='60'/></center><br>To save notes, <a style='cursor:pointer;' onclick='showCredentials()'>log in or create an account.</a>";
								document.getElementById('searchMyNotebookFlex').appendChild(newNote);	
							}
							
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

					//if search returned a Region, find its data
					if(newResult.type == "Region")
					{
						console.log("in search: calling API for connections");
						xmlHttp2 = new XMLHttpRequest();
						xmlHttp2.onreadystatechange = function()
						{
							if (xmlHttp2.readyState==4 && xmlHttp2.status==200)
							{
								var Response = JSON.parse(xmlHttp2.responseText);
								for(i=0; i<Response.length; i++)
								{
									CnxResponse = Response[i];
									window.searchResults[window.searchResults.length] = new Connection(CnxResponse.bamsID, CnxResponse.sourceID, CnxResponse.sourceName, CnxResponse.sourceAbbrev, CnxResponse.targetID, CnxResponse.targetName, CnxResponse.targetAbbrev, CnxResponse.nomenclature, CnxResponse.species, CnxResponse.dimensions, CnxResponse.coordinatePlot, CnxResponse.notes, CnxResponse.evidence, "searchResults", false);
								}
							}
						};
						var cnxUrl = "api/v1/nomenclature/1/region/" + url2[0] + "/connection/";
						xmlHttp2.open("GET",cnxUrl,false);
						xmlHttp2.send();

						//request molecules
						console.log("in search: calling API for molecules");
						xmlHttp3 = new XMLHttpRequest();
						xmlHttp3.onreadystatechange = function()
						{
							if (xmlHttp3.readyState==4 && xmlHttp3.status==200)
							{
								var Response = JSON.parse(xmlHttp3.responseText);
								for(i=0; i<Response.length; i++)
								{
									MoleculeResponse = Response[i];
									console.log(MoleculeResponse);
									window.searchResults[window.searchResults.length] = new Molecule(MoleculeResponse.bamsID, MoleculeResponse.name, MoleculeResponse.regionID, MoleculeResponse.regionName, MoleculeResponse.regionAbbrev, MoleculeResponse.distribution, MoleculeResponse.strength, MoleculeResponse.annotation, MoleculeResponse.referenceName, MoleculeResponse.referenceURL, MoleculeResponse.detailsURL, MoleculeResponse.notes, "searchResults", false);
								}
							}
						};
						var moleculeUrl = "api/v1/nomenclature/1/region/" + url2[0] + "/molecule/";
						xmlHttp3.open("GET",moleculeUrl,false);
						xmlHttp3.send();

						//
						//request molecules
						console.log("in search: calling API for cells");
						xmlHttp4 = new XMLHttpRequest();
						xmlHttp4.onreadystatechange = function()
						{
							if (xmlHttp4.readyState==4 && xmlHttp4.status==200)
							{
								var Response = JSON.parse(xmlHttp4.responseText);
								for(i=0; i<Response.length; i++)
								{
									CellResponse = Response[i];
									console.log(CellResponse);
									window.searchResults[window.searchResults.length] = new Cell(CellResponse.bamsID, CellResponse.name, CellResponse.regionID, CellResponse.regionName, CellResponse.regionAbbrev, CellResponse.detailsURL, CellResponse.notes, "searchResults", false);
								}
							}
						};
						var cellUrl = "api/v1/nomenclature/1/region/" + url2[0] + "/cell/";
						xmlHttp4.open("GET",cellUrl,false);
						xmlHttp4.send();
					}
				}
			};
			//find abbreviation
			xmlHttp.open("GET",url,false);
			xmlHttp.send();
		}
		else
		{
			console.log("This region has already been loaded:");
			$('#searchResultsName').html(window.searchResults[regionIndex].name);
			$('#searchResultsType').html(window.searchResults[regionIndex].type + ", " + window.searchResults[regionIndex].nomenclature + " (" + window.searchResults[regionIndex].species + ")");
			$('#searchAddToMapBtn').html("Add " + window.searchResults[regionIndex].abbrev + " to the Map");
			$('#searchFoundName').html(window.searchResults[regionIndex].abbrev);
			document.getElementById('searchResultsDiv').currentResult = window.searchResults[regionIndex];
			

			//
			//
			document.getElementById('searchMyNotebookFlex').innerHTML = "";
			for(j=0; j<window.searchResults[regionIndex].notes.length; j++)
			{
				var thisNote = window.searchResults[regionIndex].notes[j];
				console.log(thisNote);
				var newNote = document.createElement('div');
				newNote.className = "searchMyNotebookItem";
				newNote.id = thisNote.id;
				newNote.innerHTML = "On " + thisNote.dateTime + ", you recorded: <br>" + thisNote.note;
				document.getElementById('searchMyNotebookFlex').appendChild(newNote);
			}
		}

		if(!(window.searchOpen))
		{
			$('#intxn').animate({left:'+=410'}, 500);
			$('#searchResultsDiv').delay(100).animate({left:'11px'}, 500);
			window.searchOpen = true;
		}
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
				// console.log("in searchFromMap: Raw Response: " + xmlHttp.responseText);
				//unpack JSON response
				//make new searchResults[] object, add to searchResults
				var newResult = JSON.parse(xmlHttp.responseText);
				switch(newResult.type)
				{
					case "Region":
						console.log("in searchFromMap: instantiating new region for direct display on the map");
						var newObject = new Region(newResult.bamsID, newResult.name, newResult.abbreviation, newResult.nomenclature, newResult.species, newResult.otherNomenclatures, newResult.dataSets, newResult.coordinateInteraction, newResult.dimensions, newResult.coordinatePlot, newResult.notes, "regions", false);
							window.regions[window.regions.length] = newObject;
						// document.getElementById(window.layerData[0] + "_" + newResult.bamsID).src = "img/ui/pin/" + window.currentZoom + "_r_x.png";
						// mapCheckPinStatus(newResult.bamsID);
						
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
					// console.log("in searchFromMap: calling API for connections");
					xmlHttp2 = new XMLHttpRequest();
					xmlHttp2.onreadystatechange = function()
					{
						if (xmlHttp2.readyState==4 && xmlHttp2.status==200)
						{
							// console.log(xmlHttp2.responseText);
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
	$('#intxn').delay(100).animate({left:'-=400'}, 500);
	$('#searchResultsDiv').animate({left:'-410px'}, 500);
	window.searchOpen = false;
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
	var sameLayerIndex = 0;
	var otherLayer = false;
	var otherLayers = [];
	if(window.layerData[0] != -1)
	{
		closeSearch();
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
	else
	{
		alert("Please activate a layer before adding a region");
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

function searchSaveNote()
{
	if(window.logged)
	{
		if(scrub(document.getElementById("searchMyNotebookNew").value))
		{
			var payload = {
				note : document.getElementById("searchMyNotebookNew").value,
				itemID: document.getElementById('searchResultsDiv').currentResult.bamsID
			};

			$.post( "../php/account/notebook/region/", payload)
			.done(function( data ) {
				var response = JSON.parse(data);
				if(response.status == 200)
				{
					//success. Add to list
					var newNote = document.createElement('div');
					newNote.className = "searchMyNotebookItem";
					newNote.innerHTML = "Newly added: <br>" + payload.note;
					document.getElementById('searchMyNotebookFlex').insertBefore(newNote,document.getElementById('searchMyNotebookFlex').firstChild);

					//save note to region (searchResult)
					for(var i=0; i<window.searchResults.length; i++)
					{
						if(window.searchResults[i].bamsID == payload.itemID && window.searchResults[i].type == "Brain Region")
						{
							var newNoteObj = {
								UID: response.UID,
								dateTime: response.dateTime,
								id: response.noteID,
								itemID: payload.itemID,
								itemType: 1,
								note: payload.note
							};
							window.searchResults[i].notes.unshift(newNoteObj);
						}
					}

					//save note to region if already instantiated
					for(var i=0; i<window.regions.length; i++)
					{
						if(window.regions[i].bamsID == payload.itemID)
						{
							var newNoteObj = {
								UID: response.UID,
								dateTime: response.dateTime,
								id: response.noteID,
								itemID: payload.itemID,
								itemType: 1,
								note: payload.note
							};
							window.regions[i].notes.unshift(newNoteObj);
						}
					}
					console.log(window.regions);
				}
			});
		}
		else
		{
			alert("The note you've entered contains none of the following characters: ' \" / \\ ; & $ : ! # % ( ) { }. Please remove all illegals characters and resubmit.");
		}
	}
}