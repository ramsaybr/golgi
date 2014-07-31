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
	alert("Layer Created: " + this.id);
	
	//Create necessary DOM elements for layer
	var newLayerHead = document.createElement('div');
	newLayerHead.className = "layerCtrl layer" + this.id + " layerHead";
	newLayerHead.innerHTML = "<i class=\"icon-chevron-down\"></i> Layer " + this.id;

	var newLayerRegion = document.createElement('div');
	newLayerRegion.className = "layerCtrl layer" + this.id + " layerRegionHeader";
	newLayerRegion.innerHTML = "<i class=\"icon-chevron-right\"></i> 0 Regions";
	
	var newLayerMolecule = document.createElement('div');
	newLayerMolecule.className = "layerCtrl layer" + this.id + " layerMoleculeHeader";
	newLayerMolecule.innerHTML = "<i class=\"icon-chevron-right\"></i> 0 Molecules";

	var newLayerCellType = document.createElement('div');
	newLayerCellType.className = "layerCtrl layer" + this.id + " layerCellTypeHeader";
	newLayerCellType.innerHTML = "<i class=\"icon-chevron-right\"></i> 0 Cell Types";	

	

	var newLayerRegionACB = document.createElement('div');
	newLayerRegionACB.className = "layerCtrl layer" + this.id + " layerRegionHeader layerRegion ACB";
	newLayerRegionACB.innerHTML = "ACB";

	document.getElementById('layerContainer').appendChild(newLayerHead);
	document.getElementById('layerContainer').appendChild(newLayerRegion);
		document.getElementById('layerContainer').appendChild(newLayerRegionACB);
	document.getElementById('layerContainer').appendChild(newLayerMolecule);
	document.getElementById('layerContainer').appendChild(newLayerCellType);

}

//create window properties for storing layer data
window.layerData = new Array();

//layerData[0]: currentLayer
//layerData[1]: Array of layer objs

window.layerData[0] = 1;
window.layerData[1] = new Array();

//new layer object instantiated
window.layerData[1][window.layerData[1].length] = new Layer(window.layerData[1].length);