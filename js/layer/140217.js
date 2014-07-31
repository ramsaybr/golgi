//131022.js
//Flatmap: Layers
//@RAB1138
//
//

function Layer (layerID)
{
	//Constructor for a new layer

	this.id = layerID;
	this.name = "";
	this.visibility = true;
	this.mapDOMID = "";
	this.collapsed = false;
	this.active = false;
	this.numRegions = 0;
	//NEW140131
	this.regions = [];
	//END140131
	this.numConnection = 0;
	this.numCellTypes = 0;
	this.numMolecules = 0;

	//Layer Header
	var newLayerHead = document.createElement('div');
	newLayerHead.className = "layerCtrl layer" + this.id + " layerHead";
	newLayerHead.id = "layer" + this.id + "Head";

		//arrow for collapse/expand
		var layerHeadArrow = document.createElement('i');
		layerHeadArrow.id = "layer" + this.id + "Arrow";
		layerHeadArrow.className = "icon-chevron-down";
		layerHeadArrow.onclick = function(){layerToggleHead(layerID);};
		layerHeadArrow.style.cursor = "pointer";
		layerHeadArrow.style.width = "17px";
		layerHeadArrow.title = "Click to collapse layer description";

		//name of layer
		var layerHeadName = document.createElement('span');
		layerHeadName.id = "layer" + this.id + "Name";
		layerHeadName.style.width = "70px";
		layerHeadName.style.marginRight = "50px";
		layerHeadName.innerHTML = "Layer " + (this.id + 1);
		
		//icon for active or not?
		var layerHeadActive = document.createElement('i');
		layerHeadActive.id = "layer" + this.id + "Active";
		layerHeadActive.className = "icon-asterisk";
		layerHeadActive.onclick = function(){layerActive(layerID);};
		layerHeadActive.style.cursor = "pointer";
		layerHeadActive.style.width = "20px";
		layerHeadActive.title = "Click to make this Layer active";

		//icon for visible or not?
		var layerHeadVis = document.createElement('i');
		layerHeadVis.id = "layer" + this.id + "Vis";
		layerHeadVis.className = "icon-eye-open";
		layerHeadVis.style.cursor = "pointer";
		layerHeadVis.onclick = function(){toggleLayerVis(layerID);};
		layerHeadVis.style.width = "20px";
		layerHeadVis.title = "Click to hide this layer";

		//icon for delete layer
		var layerHeadDelete = document.createElement('i');
		layerHeadDelete.id = "layer" + this.id + "Delete";
		layerHeadDelete.className = "icon-remove";
		layerHeadDelete.style.cursor = "pointer";
		layerHeadDelete.onclick = function(){deleteLayer(layerID);};
		layerHeadDelete.style.width = "20px";
		layerHeadDelete.title = "Click to delete this layer";


	//Layer Regions
	var newLayerRegion = document.createElement('div');
	newLayerRegion.className = "layerCtrl layerSubheader layer" + this.id + " layerRegionHeader";
	newLayerRegion.id = "layer" + this.id + "RegionList";
	newLayerRegion.innerHTML = "0 Regions";
	newLayerRegion.title = "Show Region Details";
	newLayerRegion.style.cursor = "pointer";
	newLayerRegion.onclick = function(){showLayerDetails(1, this.id);};

	var newLayerConnection = document.createElement('div');
	newLayerConnection.className = "layerCtrl layerSubheader layer" + this.id + " layerMoleculeHeader";
	newLayerConnection.id = "layer" + this.id + "ConnectionList";
	newLayerConnection.innerHTML = "0 Connections";
	newLayerConnection.title = "Show Connection Details";
	newLayerConnection.style.cursor = "pointer";
	newLayerConnection.onclick = function(){showLayerDetails(2, this.id);};
	
	//Layer Molecules
	var newLayerMolecule = document.createElement('div');
	newLayerMolecule.className = "layerCtrl layerSubheader layer" + this.id + " layerMoleculeHeader";
	newLayerMolecule.id = "layer" + this.id + "MoleculeList";
	newLayerMolecule.innerHTML = "0 Molecules";
	newLayerMolecule.title = "Show Molecular Details";
	newLayerMolecule.style.cursor = "pointer";
	newLayerMolecule.onclick = function(){showLayerDetails(3, this.id);};

	//Layer Cell Types
	var newLayerCellType = document.createElement('div');
	newLayerCellType.className = "layerCtrl layerSubheader layer" + this.id + " layerCellTypeHeader";
	newLayerCellType.id = "layer" + this.id + "CellTypeList";
	newLayerCellType.innerHTML = "0 Cell Types";
	newLayerCellType.title = "Show Cell Type Details";
	newLayerCellType.style.cursor = "pointer";
	newLayerCellType.onclick = function(){showLayerDetails(4, this.id);};

	

	// var newLayerRegionACB = document.createElement('div');
	// newLayerRegionACB.className = "layerCtrl layerSubheader layer" + this.id + " layerRegionHeader layerRegion ACB";
	// newLayerRegionACB.innerHTML = "ACB";

	newLayerHead.appendChild(layerHeadArrow);
	newLayerHead.appendChild(layerHeadName);
	newLayerHead.appendChild(layerHeadActive);
	newLayerHead.appendChild(layerHeadVis);
	newLayerHead.appendChild(layerHeadDelete);


	document.getElementById('layerContainer').appendChild(newLayerHead);
	document.getElementById('layerContainer').appendChild(newLayerRegion);
	document.getElementById('layerContainer').appendChild(newLayerConnection);
	document.getElementById('layerContainer').appendChild(newLayerMolecule);
	document.getElementById('layerContainer').appendChild(newLayerCellType);

}

//create window properties for storing layer data
window.layerData = new Array();

//layerData[0]: currentLayer
//layerData[1]: Array of layer objs

window.layerData[0] = 0;
window.layerData[1] = new Array();

function newLayer()
{
	//new layer object instantiated
	window.layerData[1][window.layerData[1].length] = new Layer(window.layerData[1].length);
}

//instantiate first layer on boot
newLayer();

function layerToggleHead(layerID)
{
	//expand / collapse a layer's description
	if(window.layerData[1][layerID].collapsed == false)
	{
		$('.layer' + layerID + '.layerSubheader').fadeOut(250);
		window.layerData[1][layerID].collapsed = true;
		document.getElementById("layer"+layerID+"Arrow").className="icon-chevron-right";
		document.getElementById("layer"+layerID+"Arrow").title="Click to expand this layer";
	}
	else
	{
		$('.layer' + layerID + '.layerSubheader').fadeIn(0);
		window.layerData[1][layerID].collapsed = false;
		document.getElementById("layer"+layerID+"Arrow").className="icon-chevron-down";
		document.getElementById("layer"+layerID+"Arrow").title="Click to collapse this layer";
	}
}

//change which layer is the active layer
function layerActive(ID)
{
	document.getElementById('currentLayer').innerHTML = "Layer " + (ID + 1);
	window.layerData[0] = ID;
}

//show / hide all components in this layer
function toggleLayerVis(ID)
{
	$('#layer'+ID+'Vis').toggleClass('icon-eye-open').toggleClass('icon-eye-close');
	$('.layer' + ID + '.region').toggle();
	$('.layer' + ID + '.connection').toggle();
	$('.layer' + ID + '.pin').toggle();
}

function showLayerDetails(layerCase, layerID)
{
	switch(layerCase)
	{
		case 1:
			//show region details
			document.getElementById('layerDetailsRegionsBox').innerHTML = "";
			for(i=0; i<window.regions.length; i++)
			{
				if(window.regions[i].layer == window.layerData[0])
				{
					var newRegion = document.createElement('div');
					newRegion.className = "layerDetailsRegions";
					var ellipses = "";
					if(window.regions[i].name.length >= 22)
					{
						ellipses = "...";
					}
					newRegion.innerHTML = "<div class=\"layerDetailsRegionsName\">(" + window.regions[i].abbrev + ") " + window.regions[i].name.substring(0, 22) + ellipses + "</div><div class=\"layerDetailsRegionsFind btn btn-success btn-small\" onclick=\"layerDetailsFindObject(1, " + i + ")\"><i class=\"icon-screenshot\" style=\"margin-right:5px; margin-left:0px;\"></i>Find</div><div class=\"layerDetailsRegionsView btn btn-warning btn-small\" onclick=\"getRegionDetails(" + window.regions[i].bamsID + ")\"><i class=\"icon-eye-open\" style=\"margin-right:5px; margin-left:0px; color:#424242;\"></i>Details</div>";
					$('#layerDetailsRegionsBox').show();
					document.getElementById('layerDetailsRegionsBox').appendChild(newRegion);
				}
			}
			$('#layerDetails').toggle();
			$('#layerDetailsRegionsBox').show();
			$('#layerDetailsConnectionsBox').hide();
			document.getElementById('layerDetailsIcon').src = "img/ui/pin3.png";
			document.getElementById('layerDetailsIcon').style.left = "10px";
			document.getElementById('layerDetailsIcon').width = "20";
			document.getElementById('layerDetailsIcon').height = "60";
			document.getElementById('layerDetailsHeader').innerHTML = "Brain Regions in Layer " + (window.layerData[0] + 1);
			break;
		case 2:
			//show connection details
			document.getElementById('layerDetailsConnectionsBox').innerHTML = "";
			for(i=0; i<window.connections.length; i++)
			{
				if(window.connections[i].layer == window.layerData[0])
				{
					var newConnection = document.createElement('div');
					newConnection.className = "layerDetailsConnections";
					newConnection.innerHTML = "<div class=\"layerDetailsConnectionsSource\">" + window.connections[i].sourceAbbrev + "<i class=\"icon-white icon-arrow-right\" style=\"margin-top:2px; margin-left:8px;\"></i></div><div class=\"layerDetailsConnectionsSource\">" + window.connections[i].targetAbbrev + "</div><div class=\"layerDetailsRegionsFind btn-success btn-small btn\" onclick=\"layerDetailsFindObject(2, " + i + ")\"><i class=\"icon-screenshot\" style=\"margin-right:4px;\"></i> Find</div><div class=\"layerDetailsRegionsFind btn-warning btn-small btn\" onclick=\"getConnectionDetails(" + window.connections[i].bamsID + ")\"><i class=\"icon-eye-open\" style=\"margin-right:4px; color:#424242;\"></i> Details</div>";
					newConnection.title = window.connections[i].sourceName + " connects to " + window.connections[i].targetName;
					$('#layerDetailsRegionsBox').show();
					document.getElementById('layerDetailsConnectionsBox').appendChild(newConnection);
				}
			}
			$('#layerDetails').toggle();
			$('#layerDetailsRegionsBox').hide();
			$('#layerDetailsConnectionsBox').show();
			document.getElementById('layerDetailsIcon').src = "img/ui/connection-40x60.png";
			document.getElementById('layerDetailsIcon').style.left = "0px";
			document.getElementById('layerDetailsIcon').width = "40";
			document.getElementById('layerDetailsIcon').height = "60";
			document.getElementById('layerDetailsHeader').innerHTML = "Connections in Layer " + (window.layerData[0] + 1);
			break;
	}
}

function layerDetailsFindObject(source, index)
{
	switch(source)
	{
		case 1:
			var thisObject = window.regions[index].domElement;
			break;
		case 2:
			var thisObject = window.connections[index].domElement;
			break;
	}
	
	$(thisObject).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function hideDetails()
{
	$('#layerDetails').fadeOut(250);
	$('#layerDetailsRegionsBox').hide();
	$('#layerDetailsConnectionsBox').hide();
}

function getRegionDetails(id)
{
	console.log("in getRegionDetails:");
	//fill out details
	for(a=0; a<window.regions.length; a++)
	{
		if(window.regions[a].bamsID == id)
		{
			//found region
			document.getElementById('regionDetailsHeader').innerHTML = "(" + window.regions[a].abbrev + ") " + window.regions[a].name;
			document.getElementById('regionDetailsActiveConnectionsName').innerHTML = window.regions[a].abbrev;
		}
	}
	var numConnections = 0;
	document.getElementById('regionDetailsConnectionsBox').innerHTML = "";
	for(i=0; i<window.connections.length; i++)
	{
		if(window.connections[i].layer == window.layerData[0] && ((window.connections[i].sourceID == id) || (window.connections[i].targetID == id)))
		{
			console.log("found match");
			var newConnection = document.createElement('div');
			newConnection.className = "layerDetailsConnections";
			newConnection.innerHTML = "<div class=\"layerDetailsConnectionsSource\">" + window.connections[i].sourceAbbrev + "<i class=\"icon-white icon-arrow-right\" style=\"margin-top:2px; margin-left:8px;\"></i></div><div class=\"layerDetailsConnectionsSource\">" + window.connections[i].targetAbbrev + "</div><div class=\"layerDetailsRegionsFind btn-success btn-small btn\" onclick=\"layerDetailsFindObject(2, " + i + ")\"><i class=\"icon-screenshot\" style=\"margin-right:4px;\"></i> Find</div><div class=\"layerDetailsRegionsFind btn-warning btn-small btn\"><i class=\"icon-eye-open\" style=\"margin-right:4px; color:#424242;\"></i> Details</div>";
			newConnection.title = window.connections[i].sourceName + " connects to " + window.connections[i].targetName;
			document.getElementById('regionDetailsConnectionsBox').appendChild(newConnection);
			numConnections++;
		}
	}
	document.getElementById('regionDetailsActiveConnectionsCount').innerHTML = numConnections;

	//get citations
	document.getElementById('regionDetailsReferencesBox').innerHTML = "";
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function()
	{
		if (xmlHttp.readyState==4 && xmlHttp.status==200)
		{
			$('#regionDetails').fadeIn(500);
			var json = JSON.parse(xmlHttp.responseText);
			for(a=0; a<json.length; a++)
			{
				var newRef = document.createElement('div');
				newRef.innerHTML = "<a href='" + json[a].url + "'><img src='img/ui/paper.png' width='15' height='15'/> \"" + json[a].name + "\" by " + json[a].authors + "</a>";
				document.getElementById('regionDetailsReferencesBox').appendChild(newRef);
			}
		}
	};
	var cnxUrl = "api/v1/nomenclature/1/reference/?rID=" + id;
	xmlHttp.open("GET",cnxUrl,false);
	xmlHttp.send();
}

function hideRegionDetails()
{
	$('#regionDetails').fadeOut(500);
}

function getConnectionDetails(id)
{
	$('#connectionDetails').fadeIn(500);
	console.log("in getConnectionDetails");
	for (i=0; i<window.connections.length; i++)
	{
		if(window.connections[i].bamsID == id)
		{
			//found connection
			var thisConnection = window.connections[i];
			for (j=0; j<thisConnection.evidence.length; j++)
			{
				var newConnectionReport = document.createElement('div');
				newConnectionReport.className = "connectionDetailsReports";
				newConnectionReport.style.paddingBottom = "10px";
				newConnectionReport.innerHTML = "<span style=\"color:#424242; font-size:10px; font-weight:bold;\" class=\"btn btn-warning btn-small\" onclick=\"getConnectionDetailsViewReport(" + thisConnection.bamsID + "," + j +")\"><i class=\"icon-eye-open\" style=\"margin-top:1px;\"></i> View Report " + (j+1) + "</span>";
				document.getElementById('connectionDetailsReportsBox').appendChild(newConnectionReport);
			}
		}
	}
	document.getElementById('connectionDetailsTitle').innerHTML = "I found " + j + " connection reports:";

}
function getConnectionDetailsViewReport(index, ref)
{
	console.log("in getConnectionDetailsViewReport");
	for (i=0; i<window.connections.length; i++)
	{
		console.log("in loop");
		if(window.connections[i].bamsID == index)
		{
			console.log("found match");
			//found connection
			// var thisConnection = window.connections[i];
			$('#connectionDetailsDescription').fadeIn(500);
			$('#connectionDetailsImg').fadeIn(500);
			$('#connectionDetailsDescriptionMetadata').fadeIn(500);
			var thisEvidence = window.connections[i].evidence[ref];
			console.log(thisEvidence);
			document.getElementById('connectionDetailsSourceAbbrev').innerHTML = thisEvidence.sourceAbbrev;
			document.getElementById('connectionDetailsSourceName').innerHTML = thisEvidence.sourceName;
			document.getElementById('connectionDetailsTargetAbbrev').innerHTML = thisEvidence.targetAbbrev;
			document.getElementById('connectionDetailsTargetName').innerHTML = thisEvidence.targetName;
			document.getElementById('connectionDetailsDescriptionStrength').innerHTML = thisEvidence.strength;
			document.getElementById('connectionDetailsDescriptionTechnique').innerHTML = thisEvidence.technique;
			document.getElementById('connectionDetailsDescriptionInjection').innerHTML = thisEvidence.injectionSiteAbbrev;
			document.getElementById('connectionDetailsDescriptionTerminal').innerHTML = thisEvidence.terminalFieldAbbrev;
			document.getElementById('connectionDetailsDescriptionCuratorName').innerHTML = "<a href=\"mailto:" + thisEvidence.curatorEmail + "\">" + thisEvidence.curatorName + "</a>";
			document.getElementById('connectionDetailsDescriptionReferenceName').innerHTML = "<a href=\"" + thisEvidence.referenceURL + "\">" + thisEvidence.referenceName + "</a>";
		}
	}
}

function hideConnectionDetails()
{
	$('#connectionDetails').fadeOut(500);
}