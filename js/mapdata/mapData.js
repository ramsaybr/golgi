//Declare arrays necessary for temporarily holding results while user chooses connections to visualize.
//attach these to an appropriate DOM parent in the UI
//
document.getElementById('regionDetailsAddConnection').connections = [];
document.getElementById('regionDetailsAddConnection').selected = [];


function mapDataClose()
{
	$('#mapData').fadeOut(0);
	$('.mapDataDefault').fadeIn(0);
	$('#mapData').animate({width:400, height:250},0);
	$('#regionDetailsAddData').fadeOut(0);
	$('#regionDetailsAddConnection').fadeOut(0);
}


function mapDataOpen()
{
	//make region easier to access
	var region = document.getElementById('mapData').region;
	console.log(region);
	$('#mapDataName').show();
	$('#mapDataPartDetails').show();
	//update DOM elements to reflect region data
	$('#mapDataName').html(region.searchTerm);
	$('#mapDataNomenclature').html(region.nomeclature);
	$('#mapDataSpecies').html(region.species);
	var connections = 0;
	//find how many connections this region is involved in:
	for(i=0; i<window.connections.length; i++)
	{
		if((window.connections[i].sourceID == region.bamsID)||(window.connections[i].targetID == region.bamsID))
		{
			connections++;
		}
	}
	if(connections > 0)
	{
		$('#mapDataActiveCnxBtn').show();
	}
	$('#mapDataActiveCnxs').html(connections);
	$('#mapDataActiveMols').html(region.molecules.length);
	$('#mapDataActiveCells').html(region.cells.length);

	switch(window.currentZoom)
	{
		case 1:
			var zoomFactor = 1;
			break;
		case 2:
			var zoomFactor = 2;
			break;
		case 3:
			var zoomFactor = 4;
			break;
		case 4:
			var zoomFactor = 8;
			break;
	}
	console.log("pin data: " + region.pin.style.left);
	document.getElementById('mapData').style.left = (((region.coordinateInteraction[0]) * zoomFactor) + (zoomFactor * 25)) + "px";
	document.getElementById('mapData').style.top = (((region.coordinateInteraction[1]) * zoomFactor) - (zoomFactor * 25)) + "px";
	//fade in dialog box
	$('#mapData').fadeIn(500);

}
function mapDataAddData()
{
	$('.mapDataDefault').fadeOut(100);
	$('#mapData').animate({width:560, height:200},500);
	$('#regionDetailsAddData').fadeIn(500);
}

function mapDataAddConnections()
{
	console.log("in mapDataAddConnections");
	var region = document.getElementById('mapData').region;
	//find connections
	//find inputs
	
	document.getElementById('regionDetailsAddConnectionInputForm').innerHTML="";
	document.getElementById('regionDetailsAddConnectionOutputForm').innerHTML="";
	for(i=0; i<window.searchResults.length; i++)
	{
		if((window.searchResults[i].type == "Connection") && (window.searchResults[i].targetAbbrev == region.abbrev) && (window.searchResults[i].nomeclature == region.nomeclature))
		{
			//found an input!
			//add DOM Element to regionDetailsAddConnectionInputView

			newResultDiv = document.createElement('div');
			newResultDiv.style.position = "relative";
			newResultDiv.style.marginBottom = "10px";
			newResultDiv.style.width = "100%";
			newResultDiv.style.height = "16px";
			newResultDiv.style.left = "0px;" 

			newResultCB = document.createElement('input');
			newResultCB.type = "checkbox";
			newResultCB.name = "connections";
			newResultCB.class = "connectionCB";
			// newResultCB.value = document.getElementById('regionDetailsAddConnection').connections.length;
			newResultCB.value = i;
			newResultCB.style.float="left";
			newResultCB.style.width="20px";
			newResultCB.id = window.searchResults[i].sourceAbbrev + ">" + region.abbrev;

			newResultLabel = document.createElement('label')
			newResultLabel.style.float="left";
			newResultLabel.style.marginRight="10px";
			newResultLabel.htmlFor = window.searchResults[i].sourceAbbrev + ">" + region.abbrev;
			newResultLabel.appendChild(document.createTextNode(window.searchResults[i].sourceAbbrev + ">" + region.abbrev));

			// newResultDetail = document.createElement('span')
			// newResultDetail.style.float="left";
			// newResultDetail.innerHTML = "<i class=\"icon-eye-open icon-white\" style=\"margin-right:4px;\"></i> View Details";
			// newResultDetail.connectionResult = i;
			// newResultDetail.onclick = function(){mapDataViewConnectionEvidence(newResultDetail.connectionResult);};
			newResultDetail = document.createElement('span');
			newResultDetail.style.float="left";
			newResultDetail.style.cursor="pointer";
			newResultDetail.innerHTML = "<span onclick=\"mapDataViewConnectionEvidence(" + i + ")\"><i class=\"icon-eye-open icon-white\" style=\"margin-right:4px;\"></i> View Details</span>";

			newResultDiv.appendChild(newResultCB);
			newResultDiv.appendChild(newResultLabel);
			newResultDiv.appendChild(newResultDetail);

			//add to regionDetailsAddConnection.connections[]
			// document.getElementById('regionDetailsAddConnection').connections[document.getElementById('regionDetailsAddConnection').connections.length] = window.searchResults[i];
			document.getElementById('regionDetailsAddConnectionInputForm').appendChild(newResultDiv);
		}
	}

	for(i=0; i<window.searchResults.length; i++)
	{
		if((window.searchResults[i].type == "Connection") && (window.searchResults[i].sourceAbbrev == region.abbrev) && (window.searchResults[i].nomeclature == region.nomeclature))
		{

			//found an output
			//add DOM Element to regionDetailsAddConnectionOutputView
			//attach ID number (or array index i?) to each element

			newResultDiv = document.createElement('div');
			newResultDiv.style.position = "relative";
			newResultDiv.style.marginBottom = "10px";
			newResultDiv.style.width = "100%";
			newResultDiv.style.height = "16px";

			newResultCB = document.createElement('input');
			newResultCB.type = "checkbox";
			newResultCB.name = "connections";
			newResultCB.class = "connectionCB";
			// newResultCB.value = document.getElementById('regionDetailsAddConnection').connections.length;
			newResultCB.value = i;
			newResultCB.style.float="left";
			newResultCB.style.width="40px";
			newResultCB.id = region.abbrev + ">" + window.searchResults[i].targetAbbrev;

			newResultLabel = document.createElement('label');
			newResultLabel.style.float="left";
			newResultLabel.style.marginRight="10px";
			newResultLabel.htmlFor = region.abbrev + ">" + window.searchResults[i].targetAbbrev;
			newResultLabel.appendChild(document.createTextNode(region.abbrev + ">" + window.searchResults[i].targetAbbrev));

			newResultDetail = document.createElement('span');
			newResultDetail.style.float="left";
			newResultDetail.style.cursor="pointer";
			newResultDetail.innerHTML = "<span onclick=\"mapDataViewConnectionEvidence(" + i + ")\"><i class=\"icon-eye-open icon-white\" style=\"margin-right:4px;\"></i> View Details</span>";
			// newResultDetail.onclick = function(){ mapDataViewConnectionEvidence(i)};

			newResultDiv.appendChild(newResultCB);
			newResultDiv.appendChild(newResultLabel);
			newResultDiv.appendChild(newResultDetail);

			document.getElementById('regionDetailsAddConnectionOutputForm').appendChild(newResultDiv);
		}
	}

	//find outputs
	$('.regionDetailsAddConnectionRegion').html(region.abbrev);
	//display interface
	$('#regionDetailsAddData').fadeOut(100);
	$('#mapDataName').fadeOut(100);
	$('#mapDataPartDetails').fadeOut(100);
	//prep Add Connection view

	$('#regionDetailsAddConnection').fadeIn(500);
}

function mapDataViewConnectionEvidence(connectionNumber)
{
	console.log("in mapDataViewConnectionEvidence");
	document.getElementById('regionDetailsAddConnectionDetails').evidence = window.searchResults[connectionNumber].evidence;
	document.getElementById('regionDetailsAddConnectionDetailsTitle').innerHTML = document.getElementById('regionDetailsAddConnectionDetails').evidence.length + " Reports for " + document.getElementById('regionDetailsAddConnectionDetails').evidence[0].sourceAbbrev + "->" + document.getElementById('regionDetailsAddConnectionDetails').evidence[0].targetAbbrev;

	//clear box
	document.getElementById('regionDetailsAddConnectionDetailsReportsBox').innerHTML = "";

	for (i=0; i<document.getElementById('regionDetailsAddConnectionDetails').evidence.length; i++)
	{
		console.log(i);
		var newConnectionReport = document.createElement('div');
		newConnectionReport.className = "regionDetailsAddConnectionDetailsReports";
		newConnectionReport.style.paddingBottom = "10px";
		newConnectionReport.innerHTML = "<span style=\"color:#424242; font-size:10px; font-weight:bold;\" class=\"btn btn-warning btn-small\" onclick=\"mapDataViewConnectionEvidenceViewReport(" + i + ")\"><i class=\"icon-eye-open\" style=\"margin-top:1px;\"></i> View Report " + (i+1) + "</span>";
		document.getElementById('regionDetailsAddConnectionDetailsReportsBox').appendChild(newConnectionReport);
	}
	$('#regionDetailsAddConnectionDetails').show();
}

function mapDataViewConnectionEvidenceViewReport(index)
{
	$('#regionDetailsAddConnectionDetailsDescription').fadeIn(500);
	$('#regionDetailsAddConnectionDetailsImg').fadeIn(500);
	$('#regionDetailsAddConnectionDetailsDescriptionMetadata').fadeIn(500);
	var thisEvidence = document.getElementById('regionDetailsAddConnectionDetails').evidence[index];
	console.log(thisEvidence);
	document.getElementById('regionDetailsAddConnectionDetailsSourceAbbrev').innerHTML = thisEvidence.sourceAbbrev;
	document.getElementById('regionDetailsAddConnectionDetailsSourceName').innerHTML = thisEvidence.sourceName;
	document.getElementById('regionDetailsAddConnectionDetailsTargetAbbrev').innerHTML = thisEvidence.targetAbbrev;
	document.getElementById('regionDetailsAddConnectionDetailsTargetName').innerHTML = thisEvidence.targetName;
	document.getElementById('regionDetailsAddConnectionDetailsDescriptionStrength').innerHTML = thisEvidence.strength;
	document.getElementById('regionDetailsAddConnectionDetailsDescriptionTechnique').innerHTML = thisEvidence.technique;
	document.getElementById('regionDetailsAddConnectionDetailsDescriptionInjection').innerHTML = thisEvidence.injectionSiteAbbrev;
	document.getElementById('regionDetailsAddConnectionDetailsDescriptionTerminal').innerHTML = thisEvidence.terminalFieldAbbrev;
	document.getElementById('regionDetailsAddConnectionDetailsDescriptionCuratorName').innerHTML = "<a href=\"mailto:" + thisEvidence.curatorEmail + "\">" + thisEvidence.curatorName + "</a>";
	document.getElementById('regionDetailsAddConnectionDetailsDescriptionReferenceName').innerHTML = "<a href=\"" + thisEvidence.referenceURL + "\">" + thisEvidence.referenceName + "</a>";
}

function mapDataActivateConnection()
{
	console.log("in mapDataActivateConnection");
	document.getElementById('regionDetailsAddConnection').selected = [];
	//check to make sure at least one connection has been selected
	// document.getElementById('regionDetailsAddConnection').connections[document.getElementById('regionDetailsAddConnection').connections.length] = window.searchResults[i];
	var inputBox = document.getElementById('regionDetailsAddConnectionInputForm');
	for(i=0; i<inputBox.length; i++)
	{
		if(inputBox[i].checked)
		{
			document.getElementById('regionDetailsAddConnection').selected[document.getElementById('regionDetailsAddConnection').selected.length] = inputBox[i].value;
		}
	}
	var outputBox = document.getElementById('regionDetailsAddConnectionOutputForm');
	for(i=0; i<outputBox.length; i++)
	{
		if(outputBox[i].checked)
		{
			document.getElementById('regionDetailsAddConnection').selected[document.getElementById('regionDetailsAddConnection').selected.length] = outputBox[i].value;
		}
	}
	
	console.log("in mapDataActivateConnection: " + document.getElementById('regionDetailsAddConnection').selected.length + " connections to add");
	// console.log(document.getElementById('regionDetailsAddConnection').selected.length);
	//document.getElementById('regionDetailsAddConnection').selected now contains selected connections to show!
	if(document.getElementById('regionDetailsAddConnection').selected.length > 0)
	{
		for(ii=0; ii<document.getElementById('regionDetailsAddConnection').selected.length; ii++)
		{
			console.log("in mapDataActivateConnection. connection loop: ii=" + ii);
			//loop thru the selected connections
			//get this connection
			// var thisConnection = document.getElementById('regionDetailsAddConnection').connections[i];
			var thisConnection = window.searchResults[document.getElementById('regionDetailsAddConnection').selected[ii]];
			// console.log("thisConnection: " + thisConnection);
			
			//is this connection already active?
			var isPresent = 0;
			if(window.connections.length > 0)
			{
				console.log("Connections already active");
				for(j=0; j<window.connections.length; j++)
				{
					if((window.connections[j].nomeclature == thisConnection.nomeclature) && (window.connections[j].sourceID == thisConnection.sourceID) && (window.connections[j].targetID == thisConnection.targetID))
					{
						console.log(thisConnection);
						console.log("Checking connection");
						console.log("thisConnection: " + thisConnection.sourceAbbrev);
						console.log("windowConnection: " + window.connections[j].sourceAbbrev);
						console.log("thisConnection: " + thisConnection.targetAbbrev);
						console.log("windowConnection: " + window.connections[j].targetAbbrev);
						console.log("Already Active");
						//found this connection already active in this layer. Same layer, nomenclature, source, target
						isPresent++;
					}
				}
				if(!(isPresent))
				{
					//this connection is not active yet
					//is the source region active?
					// console.log(thisConnection);
					//is the source region active?
					var sourcePresent = 0;
					for(k=0; k<window.regions.length; k++)
					{
						if(window.regions[k].bamsID == thisConnection.sourceID && window.regions[k].layer == window.layerData[0] && window.regions[k].nomenclature == thisConnection.nomenclature)
						{
							//source region exists in current layer
							sourcePresent++;
						}
					}
					console.log("Found " + sourcePresent + " source matches");
					var sourceSavedA = 0;
					if(sourcePresent == 0)
					{
						console.log("Source is not present");
						//instantiate new region object
						for(kk=0; kk<window.searchResults.length; kk++)
						{
							if(window.searchResults[kk].bamsID == thisConnection.sourceID && window.searchResults[kk].nomenclature == thisConnection.nomenclature && window.searchResults[kk].type == "Region")
							{
								sourceSavedA++;
								console.log("found match:" + window.searchResults[kk].abbrev);
								//found it! Instantiate new region
								var newRegion = window.searchResults[kk];
								window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
							}
						}
						if(sourceSavedA == 0)
						{
							console.log("Could not find match: loading searchFromMap");
							searchFromMap(thisConnection.sourceAbbrev);	
						}	
					}

					//is the target region active?
					var targetPresent = 0;
					var targetSavedA = 0;
					for(l=0; l<window.regions.length; l++)
					{
						if(window.regions[l].bamsID == thisConnection.targetID && window.regions[l].layer == window.layerData[0])
						{
							//source region exists in current layer
							targetPresent++;
						}
					}
					console.log("Found " + targetPresent + " target matches");
					if(targetPresent == 0)
					{
						console.log("Target is not present");
						//instantiate new region object
						for(ll=0; ll<window.searchResults.length; ll++)
						{
							if(window.searchResults[ll].bamsID == thisConnection.targetID && window.searchResults[ll].nomenclature == thisConnection.nomenclature && window.searchResults[ll].type == "Region")
							{
								targetSavedA++;
								console.log("found match:" + window.searchResults[ll].abbrev);
								//found it! Instantiate new region
								var newRegion = window.searchResults[ll];
								window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
							}
						}
						if(targetSavedA == 0)
						{
							console.log("Could not find match: loading searchFromMap");
							searchFromMap(thisConnection.targetAbbrev);	
						}
					}
					//now instantiate connection
					var instantiatedConnection = new Connection(thisConnection.bamsID, thisConnection.sourceID, thisConnection.sourceName, thisConnection.sourceAbbrev, thisConnection.targetID, thisConnection.targetName, thisConnection.targetAbbrev, thisConnection.nomenclature, thisConnection.species, thisConnection.dimensions, thisConnection.coordinatePlot, thisConnection.notes, thisConnection.evidence, "connections", false);
					window.connections[window.connections.length] = instantiatedConnection;

				}
			}
			else
			{
				console.log("in mapDataActivateConnection. No active connection yet (around line 327)");
				//there are no connections yet
				//is the source region active?
				var sourcePresent = 0;
				for(k=0; k<window.regions.length; k++)
				{
					if(window.regions[k].bamsID == thisConnection.sourceID && window.regions[k].layer == window.layerData[0] && window.regions[k].nomenclature == thisConnection.nomenclature)
					{
						//source region exists in current layer
						sourcePresent++;
					}
				}
				console.log("in mapDataActivateConnection: Found " + sourcePresent + " source matches");

				var sourceSavedB = 0;
				if(sourcePresent == 0)
				{
					console.log("Source is not present. initializing object");
					//instantiate new region object
					for(kk=0; kk<window.searchResults.length; kk++)
					{
						if(window.searchResults[kk].bamsID == thisConnection.sourceID && window.searchResults[kk].nomenclature == thisConnection.nomenclature && window.searchResults[kk].type == "Region")
						{
							sourceSavedB++;
							console.log("found match:" + window.searchResults[kk].abbrev);
							//found it! Instantiate new region
							var newRegion = window.searchResults[kk];
							window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
						}
					}
					if(sourceSavedB == 0)
					{
						console.log("Could not find match: loading searchFromMap");
						searchFromMap(thisConnection.sourceAbbrev);
					}
				}

				//is the target region active?
				var targetPresent = 0;
				for(l=0; l<window.regions.length; l++)
				{
					if(window.regions[l].bamsID == thisConnection.targetID && window.regions[l].layer == window.layerData[0] && window.regions[l].nomenclature == thisConnection.nomenclature)
					{
						//source region exists in current layer
						targetPresent++;
					}
				}
				console.log("in mapDataActivateConnection: Found " + targetPresent + " target matches");

				//has data about the target even been pulled from the server yet?
				var targetSavedB = 0;
				if(targetPresent == 0)
				{
					console.log("Target is not present");
					//instantiate new region object
					for(ll=0; ll<window.searchResults.length; ll++)
					{
						if(window.searchResults[ll].bamsID == thisConnection.targetID && window.searchResults[ll].nomenclature == thisConnection.nomenclature && window.searchResults[ll].type == "Region")
						{
							targetSavedB++;
							console.log("in mapDataActivateConnection: found match! bamsID:" + window.searchResults[ll].bamsID);
							console.log("in mapDataActivateConnection: found match! targetID:" + window.searchResults[ll].targetID);
							console.log("in mapDataActivateConnection: found match! abbrev:" + window.searchResults[ll].abbrev);
							//found it! Instantiate new region
							var newRegion = window.searchResults[ll];
							window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
						}
					}
					if(targetSavedB == 0)
					{
						console.log("in mapDataActivateConnection: Could not find match: loading searchFromMap, passing " + thisConnection.targetAbbrev);
						searchFromMap(thisConnection.targetAbbrev);
					}
				}
				//now instantiate connection
				console.log("in mapDataActivateConnection: about to instantiate connection to map");
				console.log("in mapDataActivateConnection: evidence=" + thisConnection.evidence);
				var instantiatedConnection = new Connection(thisConnection.bamsID, thisConnection.sourceID, thisConnection.sourceName, thisConnection.sourceAbbrev, thisConnection.targetID, thisConnection.targetName, thisConnection.targetAbbrev, thisConnection.nomenclature, thisConnection.species, thisConnection.dimensions, thisConnection.coordinatePlot, thisConnection.notes, thisConnection.evidence, "connections", false);
				// Connection(bamsID, sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, species, dimensions, coordinatePlot, notes, evidence, destination, otherLayers)
				window.connections[window.connections.length] = instantiatedConnection;
				//return instantiatedConnection;
			}
			console.log("end of loop. ii=" + ii);
		}
		//close dialog
		mapDataClose();
	}
	else
	{
		alert("Please select at least one connection.");
	}
}