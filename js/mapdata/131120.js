//Declare arrays necessary for temporarily holding results while user chooses connections to visualize.
//attach these to an appropriate DOM parent in the UI
//
document.getElementById('regionDetailsAddConnection').connections = [];
document.getElementById('regionDetailsAddConnection').selected = [];


function mapDataClose()
{
	$('#mapData').fadeOut(0);
	$('.mapDataDefault').fadeIn(0);
	$('#mapData').animate({width:300, height:250},0);
	$('#regionDetailsAddData').fadeOut(0);
	$('#regionDetailsAddConnection').fadeOut(0);
}


function mapDataOpen()
{
	//make region easier to access
	var region = document.getElementById('mapData').region;
	console.log(region);
	$('.mapDataName').fadeIn(0);
	$('.mapDataPartDetails').fadeIn(0);
	//update DOM elements to reflect region data
	$('#mapDataName').html(region.searchTerm);
	$('#mapDataNomenclature').html(region.nomeclature);
	$('#mapDataSpecies').html(region.species);
	$('#mapDataActiveCnxs').html(region.connections.length);
	$('#mapDataActiveMols').html(region.molecules.length);
	$('#mapDataActiveCells').html(region.cells.length);

	document.getElementById('mapData').style.left = (region.coordinatePlot[window.currentZoom-1][0]+50);
	document.getElementById('mapData').style.top = (region.coordinatePlot[window.currentZoom-1][1])-270;
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
	var region = document.getElementById('mapData').region;
	//find connections
	//find inputs
	
	
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

			newResultDetail = document.createElement('span')
			newResultDetail.style.float="left";
			newResultDetail.innerHTML = "<i class=\"icon-eye-open icon-white\" style=\"margin-right:4px;\"></i> View Details";
			var connectionResult = window.searchResults[i];
			newResultDetail.onclick = function(){ mapDataViewConnectionEvidence(connectionResult);};

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

			newResultLabel = document.createElement('label')
			newResultLabel.style.float="left";
			newResultLabel.style.marginRight="10px";
			newResultLabel.htmlFor = region.abbrev + ">" + window.searchResults[i].targetAbbrev;
			newResultLabel.appendChild(document.createTextNode(region.abbrev + ">" + window.searchResults[i].targetAbbrev));

			newResultDetail = document.createElement('span')
			newResultDetail.style.float="left";
			newResultDetail.innerHTML = "<i class=\"icon-eye-open icon-white\" style=\"margin-right:4px;\"></i> View Details";
			newResultDetail.onclick = function(){ mapDataViewConnectionEvidence(window.searchResults[i]);};

			newResultDiv.appendChild(newResultCB);
			newResultDiv.appendChild(newResultLabel);
			newResultDiv.appendChild(newResultDetail);

			//add to regionDetailsAddConnection.connections[]
			// document.getElementById('regionDetailsAddConnection').connections[document.getElementById('regionDetailsAddConnection').connections.length] = window.searchResults[i];

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

function mapDataViewConnectionEvidence(connection)
{
	console.log(connection);
}

function mapDataActivateConnection()
{
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
	
	console.log(document.getElementById('regionDetailsAddConnection').selected.length);
	//document.getElementById('regionDetailsAddConnection').selected now contains selected connections to show!
	for(i=0; i<document.getElementById('regionDetailsAddConnection').selected.length; i++)
	{
		console.log("in connection loop: i=" + i);
		//loop thru the selected connections
		//get this connection
		// var thisConnection = document.getElementById('regionDetailsAddConnection').connections[i];
		var thisConnection = window.searchResults[document.getElementById('regionDetailsAddConnection').selected[i]];
		
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
				console.log
				//this connection is not active yet
				//is the source region active?
				console.log(thisConnection);
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
				if(sourcePresent == 0)
				{
					console.log("Source is not present");
					//instantiate new region object
					for(kk=0; kk<window.searchResults.length; kk++)
					{
						if(window.searchResults[kk].bamsID == thisConnection.sourceID && window.searchResults[kk].nomenclature == thisConnection.nomenclature)
						{
							console.log("found match:" + window.searchResults[kk].abbrev);
							//found it! Instantiate new region
							var newRegion = window.searchResults[kk];
							window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
						}
					}
					
				}

				//is the target region active?
				var targetPresent = 0;
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
						if(window.searchResults[ll].bamsID == thisConnection.targetID && window.searchResults[ll].nomenclature == thisConnection.nomenclature)
						{
							console.log("found match:" + window.searchResults[ll].abbrev);
							//found it! Instantiate new region
							var newRegion = window.searchResults[ll];
							window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
						}
					}			
				}
				//now instantiate connection
				var instantiatedConnection = new Connection(thisConnection.bamsID, thisConnection.sourceID, thisConnection.sourceName, thisConnection.sourceAbbrev, thisConnection.targetID, thisConnection.targetName, thisConnection.targetAbbrev, thisConnection.nomenclature, thisConnection.species, thisConnection.coordinateInteraction, thisConnection.dimensions, thisConnection.coordinatePlot, thisConnection.notes, thisConnection.evidence, "connections", false);
				window.connections[window.connections.length] = instantiatedConnection;

			}
		}
		else
		{
			
			//there are no connections yet
			console.log("No connections active yet");
			console.log(thisConnection);
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
			if(sourcePresent == 0)
			{
				console.log("Source is not present");
				//instantiate new region object
				for(kk=0; kk<window.searchResults.length; kk++)
				{
					if(window.searchResults[kk].bamsID == thisConnection.sourceID && window.searchResults[kk].nomenclature == thisConnection.nomenclature)
					{
						console.log("found match:" + window.searchResults[kk].abbrev);
						//found it! Instantiate new region
						var newRegion = window.searchResults[kk];
						window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
					}
				}
				
			}

			//is the target region active?
			var targetPresent = 0;
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
					if(window.searchResults[ll].bamsID == thisConnection.targetID && window.searchResults[ll].nomenclature == thisConnection.nomenclature)
					{
						console.log("found match:" + window.searchResults[ll].abbrev);
						//found it! Instantiate new region
						var newRegion = window.searchResults[ll];
						window.regions[window.regions.length] = new Region(newRegion.bamsID, newRegion.name, newRegion.abbrev, newRegion.nomenclature, newRegion.species, newRegion.otherNomenclatures, newRegion.dataSets, newRegion.coordinateInteraction, newRegion.dimensions, newRegion.coordinatePlot, newRegion.notes, "regions", false);
					}
				}			
			}
			//now instantiate connection
			var instantiatedConnection = new Connection(thisConnection.bamsID, thisConnection.sourceID, thisConnection.sourceName, thisConnection.sourceAbbrev, thisConnection.targetID, thisConnection.targetName, thisConnection.targetAbbrev, thisConnection.nomenclature, thisConnection.species, thisConnection.coordinateInteraction, thisConnection.dimensions, thisConnection.coordinatePlot, thisConnection.notes, thisConnection.evidence, "connections", false);
			window.connections[window.connections.length] = instantiatedConnection;
			//return instantiatedConnection;
		}
		console.log("end of loop. i=" + i);
	}
}




























































