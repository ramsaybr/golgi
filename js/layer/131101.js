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
	newLayerRegion.innerHTML = "0 Regions:";
	
	//Layer Molecules
	var newLayerMolecule = document.createElement('div');
	newLayerMolecule.className = "layerCtrl layerSubheader layer" + this.id + " layerMoleculeHeader";
	newLayerMolecule.innerHTML = "0 Molecules:";

	//Layer Cell Types
	var newLayerCellType = document.createElement('div');
	newLayerCellType.className = "layerCtrl layerSubheader layer" + this.id + " layerCellTypeHeader";
	newLayerCellType.innerHTML = "0 Cell Types:";

	

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
	// document.getElementById('layerContainer').appendChild(newLayerRegionACB);
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
}