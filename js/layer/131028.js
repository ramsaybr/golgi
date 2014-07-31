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
	
	//Create necessary DOM elements for layer
	var newLayerHead = document.createElement('div');
	newLayerHead.className = "layerCtrl layer" + this.id + " layerHead";
	newLayerHead.innerHTML = "<i class=\"icon-chevron-down\" onclick=\"layerToggleHead(" + layerID + ")\" style=\"cursor:pointer; margin-right:20px;\" title=\"Click to collapse layer description\"></i> Layer " + (this.id + 1) + "<span style=\"float:right; width:25px;\"><i id=\"" + layerID + "Remove\" class=\"icon-remove\" style=\"cursor:pointer;\" title=\"Click to delete this layer\"></i></span><span style=\"float:right; width:25px;\"><i class=\"icon-eye-open\" style=\"cursor:pointer;\" id=\"" + layerID + "Vis\" title=\"Click to hide this layer\"></i></span>";

	
	if(window.layerData[1].length == 0)
	{
		//first layer. By default it must be the active layer
		newLayerHead.innerHTML = newLayerHead.innerHTML + "<span style=\"float:right; width:25px;\"><i class=\"icon-asterisk\" id=\"" + layerID + "Vis\" title=\"This is the active layer\"></i></span>";
	}
	newLayerHead.id = "layer" + this.id + "Head";
	// newLayerHead.onclick = function(){ layerToggleHead(layerID);};

	var newLayerRegion = document.createElement('div');
	newLayerRegion.className = "layerCtrl layerSubheader layer" + this.id + " layerRegionHeader";
	newLayerRegion.innerHTML = "0 Regions:";
	
	var newLayerMolecule = document.createElement('div');
	newLayerMolecule.className = "layerCtrl layerSubheader layer" + this.id + " layerMoleculeHeader";
	newLayerMolecule.innerHTML = "0 Molecules:";

	var newLayerCellType = document.createElement('div');
	newLayerCellType.className = "layerCtrl layerSubheader layer" + this.id + " layerCellTypeHeader";
	newLayerCellType.innerHTML = "0 Cell Types:";	

	

	// var newLayerRegionACB = document.createElement('div');
	// newLayerRegionACB.className = "layerCtrl layerSubheader layer" + this.id + " layerRegionHeader layerRegion ACB";
	// newLayerRegionACB.innerHTML = "ACB";

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
		document.getElementById("layer"+layerID+"Head").innerHTML = "<i class=\"icon-chevron-right\" onclick=\"layerToggleHead(" + layerID + ")\" style=\"cursor:pointer; margin-right:20px;\" title=\"Click to expand layer description\"></i> Layer " + (layerID + 1) + "<span style=\"float:right; width:25px;\"><i id=\"" + layerID + "Remove\" class=\"icon-remove\" style=\"cursor:pointer;\" title=\"Click to delete this layer\"></i></span><span style=\"float:right; width:25px;\"><i class=\"icon-eye-open\" style=\"cursor:pointer;\" id=\"" + layerID + "Vis\" title=\"Click to hide this layer\"></i></span>";
	}
	else
	{
		$('.layer' + layerID + '.layerSubheader').fadeIn(0);
		window.layerData[1][layerID].collapsed = false;
		document.getElementById("layer"+layerID+"Head").innerHTML = "<i class=\"icon-chevron-down\" onclick=\"layerToggleHead(" + layerID + ")\" style=\"cursor:pointer; margin-right:20px;\" title=\"Click to collapse layer description\"></i> Layer " + (layerID + 1) + "<span style=\"float:right; width:25px;\"><i id=\"" + layerID + "Remove\" class=\"icon-remove\" style=\"cursor:pointer;\" title=\"Click to delete this layer\"></i></span><span style=\"float:right; width:25px;\"><i class=\"icon-eye-open\" style=\"cursor:pointer;\" id=\"" + layerID + "Vis\" title=\"Click to hide this layer\"></i></span>";
	}
}