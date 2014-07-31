function mapDataClose()
{
	$('#mapData').fadeOut(0);
	$('.mapDataDefault').fadeIn(0);
	$('#mapData').animate({width:300, height:250},0);
	$('#regionDetailsAddData').fadeOut(0);
}


function mapDataOpen()
{
	//make region easier to access
	var region = document.getElementById('mapData').region;

	//update DOM elements to reflect region data
	$('#mapDataName').html(region.searchTerm);
	$('#mapDataNomenclature').html(region.nomeclature);
	$('#mapDataSpecies').html(region.species);
	$('#mapDataActiveCnxs').html(region.connections.length);
	$('#mapDataActiveMols').html(region.molecules.length);
	$('#mapDataActiveCells').html(region.cells.length);

	document.getElementById('mapData').style.left = (region.coordinatePlot[window.currentZoom-1][0]);
	document.getElementById('mapData').style.top = (region.coordinatePlot[window.currentZoom-1][1])-250;
	//fade in dialog box
	$('#mapData').fadeIn(500);

}
function mapDataAddData()
{
	$('.mapDataDefault').fadeOut(100);
	$('#mapData').animate({width:560, height:200},500);
	$('#regionDetailsAddData').fadeIn(500);
}