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

			newResultDetail = document.createElement('span')
			newResultDetail.style.float="left";
			newResultDetail.innerHTML = "<i class=\"icon-eye-open icon-white\" style=\"margin-right:4px;\"></i> View Details";
			var connectionResult = window.searchResults[i];
			newResultDetail.onclick = function(){mapDataViewConnectionEvidence(connectionResult);};

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

function mapDataViewConnectionEvidence(connectionID)
{
	console.log(window.searchResults[connectionID]);
	$('#regionDetailsAddConnectionDetails').show();
}

function mapDataActivateConnection()
{
	console.log("in mapDataActivateConnection");
	document.getElementById('regionDetailsAddConnection').selected = [];
	
	//get selection for regions to activate
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
	
	for(ii=0; ii<document.getElementById('regionDetailsAddConnection').selected.length; ii++)
	{
		console.log("in mapDataActivateConnection. connection loop: ii=" + ii);
		// if(partActive())
		console.log(document.getElementById('regionDetailsAddConnection').selected[ii]);
	}
}