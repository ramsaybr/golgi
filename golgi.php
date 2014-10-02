<?php include_once('php/header.php'); ?>

		<div id="masterDiv">
		<!-- Begin master div -->

			<div id="ctrl">
				<div id="headerBar">
					<div id="searchDiv">
						<input type="text" id="searchInput" value="Search to add data to the map" onclick="clearSearch()" data-provide="typeahead"/>
						<div id="searchInputIcon"><i class="icon-search"></i></div>
						<div class="btn btn-success" id="searchButton" onclick="search(null)">Search</div>
					</div>
					<div id="searchResultsDiv">
						<div id="searchResultsClose" onclick="closeSearch()">
							<i class="icon-remove"></i>
						</div>
						<div id="searchResultsName">
						</div>
						<div id="searchResultsType">
						</div>
						<div id="searchOtherResults">
						</div>
						<div id="searchAddToMap">
							<img id="searchAddToMapIcon" src="img/ui/pin4.png" width="20" height="60"/>
							<div id="searchAddToMapBtn" class="btn btn-success" onclick="addRegion()"></div>
						</div>
						<div id="searchFoundData">
							I found <span id="searhcFoundNumber"></span> data sets within the <span id="searchFoundName"></span>:
						</div>
						<div id="searchConnection">
							<img id="searchConnectionIcon" src="img/ui/connection-40x60.png" width="33" height="50"/>
							<div id="searchConnectionBtn" class="btn btn-warning yellowBtn" onclick="searchViewCnxs()">Connections</div>
						</div>
						<div id="searchMolecules">
							<img id="searchConnectionIcon" src="img/ui/molecule.png" width="33" height="50"/>
							<div id="searchMoleculesBtn" class="btn btn-warning yellowBtn">Molecules</div>
						</div>
						<div id="searchCellTypes">
							<img id="searchConnectionIcon" src="img/ui/cellType-40x60.png" width="33" height="5 0"/>
							<div id="searchCellTypesBtn" class="btn btn-warning yellowBtn">Cell Types</div>
						</div>
						<div id="searchMyNotesLabel">
							My Notes:
						</div>
						<textarea rows="4" id="searchMyNotes"></textarea>


					</div>
					<div id="userDiv">
						<i class="icon-user icon-white" style="padding-right:10px;"></i>Logged in as <a>Ramsay Brown</a>
					</div>
					<div id="mapCtrl">
						<div id="zoomSlider">
						</div>
						
					</div>
					<div id="layers">
						<div style="position:relative; left:0px; background-color: #3D3C42; top:0px; height:26px; width:100%; border-radius: 0px 0px 0px 4px;">
							<div id="layersHeader">
								Active Data Layer: <span id="currentLayer">Layer 1</span>
							</div>
						</div>
						<div id="layerContainer">
						</div>
						<div style="position:relative; top:0px; background-color:#3D3C42; left:0px; width:100%; height:auto; padding-bottom:20px; border-radius: 4px 0px 0px 4px;">
							<div id="layerAddLayer" class="btn btn-success" onclick="newLayer()">
								Add Layer
							</div>
							<div style="position:relative; top:0px; left:10px; width:180px; height:30px;">
								<div class="btn dropdown-toggle btn-inverse" style="width:156px; text-align:center;" data-toggle="dropdown">Adjust Map<span class="caret"></span></div>
								<ul class="dropdown-menu dropdown-inverse" role="menu" style="overflow-y: auto; min-height: 80px; max-height: 250.5999755859375px;"><li rel="0" onclick="updateMap(1)"><a tabindex="-1" class=""><span class="pull-left">Outline Only</span></a></li><li rel="1" onclick="updateMap(2)"><a tabindex="-1" class=""><span class="pull-left">Regions</span></a></li><li rel="2" onclick="updateMap(3)"><a tabindex="-1" class=""><span class="pull-left">Regions + Names</span></a></li></ul>
							</div>
						</div>
					</div>
					<div id="layerDetails" style="display:none;">
							<img src="img/ui/connection-40x60.png" width="40" height="60" style="position:absolute; left:0px; top:0px;" id="layerDetailsIcon"/>
							<div id="layerDetailsHeader">Connections in Layer 1</div>
							<div id="layerDetailsRegionsBox" style="display:none;"></div>
							<div id="layerDetailsConnectionsBox" style="display:none"></div>
							<div id="layerDetailsClose" onclick="hideDetails()"><i class="icon-remove"></i></div>
					</div>
					<div id="regionDetails" style="display:none;">
						<div id="regionDetailsHeader"></div>
						<div id="regionDetailsActiveConnections">The <span id="regionDetailsActiveConnectionsName"></span> is in <span id="regionDetailsActiveConnectionsCount"></span> connections in this layer:</div>
						<div id="regionDetailsConnectionsBox"></div>
						<div id="regionDetailsReferences">and can be found in these papers:</div>
						<div id="regionDetailsReferencesBox"></div>
						<div id="layerDetailsClose" onclick="hideRegionDetails()" style="top:20px;"><i class="icon-remove"></i></div>
					</div>
					<div id="connectionDetails" style="display:none">
							<div id="connectionDetailsTitle"></div>
							<div id="connectionDetailsReportsBox"></div>
							<div id="connectionDetailsImg" style="display:none;"><img src="img/ui/longConnection.png"/></div>
							<div id="connectionDetailsSourceAbbrev"></div>
							<div id="connectionDetailsSourceName"></div>
							<div id="connectionDetailsTargetAbbrev"></div>
							<div id="connectionDetailsTargetName"></div>
							<div id="connectionDetailsDescription" style="display:none;">A <span id="connectionDetailsDescriptionStrength"></span> connection was found using <span id="connectionDetailsDescriptionTechnique"></span> injected into the <span id="connectionDetailsDescriptionInjection"></span> with terminal fields found in the <span id="connectionDetailsDescriptionTerminal"></span>.</div>
							<div id="connectionDetailsDescriptionMetadata" style="display:none">Curated by <span id="connectionDetailsDescriptionCuratorName"></span> from "<span id="connectionDetailsDescriptionReferenceName"></span>"</div>
							<div id="layerDetailsClose" onclick="hideConnectionDetails()" style="top:20px;"><i class="icon-remove"></i></div>
					</div>

				</div>
			</div>


			<div id="intxn">
				<div id="mapData" style="display:none;">
					<div id="mapDataName">
					</div>
					<div id="mapDataDefaultCnx" class="mapDataDefault">
						<img src="img/ui/connection-40x60.png" width="20" height="30" class="mapDataIcon"/>
						<span id="mapDataActiveCnxs"></span> Connection(s) currently on map <span class="btn btn-small btn-warning mapDataViewDetails" style="display:none;" onclick="showLayerDetails(2, window.layerData[0])" id="mapDataActiveCnxBtn"><i class="icon-eye-open" style="margin-right:3px; margin-top:1px;"></i>View Details</span>
					</div>
					<div id="mapDataDefaultMols" class="mapDataDefault">
						<img src="img/ui/molecule-40x60.png" width="20" height="30" class="mapDataIcon"/>
						<span id="mapDataActiveMols"></span> molecule(s) currently on map
					</div>
					<div id="mapDataDefaultCells" class="mapDataDefault">
						<img src="img/ui/cellType-40x60.png" width="20" height="30" class="mapDataIcon"/>
						<span id="mapDataActiveCells">0</span> Cell Type(s) currently on map
					</div>
					<div class="btn btn-success mapDataDefault" id="mapDataDefaultAddData" onclick="mapDataAddData()">
						Add Data to Map
					</div>

					<div id="mapDataClose" onclick="mapDataClose()">
						<i class="icon-white icon-remove"></i>
					</div>

					<div id="regionDetailsAddData" style="display:none;">
						<div id="mapDataAddCnx">
							<img src="img/ui/connection.png" width="52.8" height="80" class="mapDataAddIcon"/>
							<div class="btn btn-success" id="mapDataAddCnxBtn" onclick="mapDataAddConnections()">
								Add Connections
							</div>
						</div>

						<div id="mapDataAddMol">
							<img src="img/ui/molecule.png" width="52.8" height="80" class="mapDataAddIcon"/>
							<div class="btn btn-success" id="mapDataAddMolBtn">
								Add Molecules
							</div>
						</div>
						<div id="mapDataAddCell">
							<img src="img/ui/cellType.png" width="52.8" height="80" class="mapDataAddIcon"/>
							<div class="btn btn-success" id="mapDataAddCellBtn">
								Add Cell Types
							</div>
						</div>
						<div id="mapDataViewPaper">
							<img src="img/ui/paper.png" width="52.8" height="80" class="mapDataAddIcon"/>
							<div class="btn btn-success" id="mapDataViewPaperBtn">
								View Papers
							</div>
						</div>
					</div>
					<div id="regionDetailsAddConnection" style="display:none;">
						<div id="regionDetailsAddConnectionTitle">Add Connection
						</div>
						<div id="regionDetailsAddConnectionInputTitle">
							<img src="img/ui/cnxInput.png" width="60" height="30" style="width:60px; height:30px; float:left; margin-right:10px;"/>Inputs to
							<span class="regionDetailsAddConnectionRegion"></span>
						</div>
						<div id="regionDetailsAddConnectionOutputTitle">
							<img src="img/ui/cnxOutput.png" width="60" height="30" style="width:60px; height:30px; float:left; margin-right:10px;"/>Outputs of
							<span class="regionDetailsAddConnectionRegion"></span>
						</div>
						<div id="regionDetailsAddConnectionInputView">
							<form id="regionDetailsAddConnectionInputForm"></form>
						</div>
						<div id="regionDetailsAddConnectionOutputView">
							<form id="regionDetailsAddConnectionOutputForm"></form>
						</div>
						<div class="btn btn-success" id="regionDetailsAddConnectionBtn" onclick="mapDataActivateConnection()">Add Selected to Map</div>
						<div id="regionDetailsAddConnectionDetails" style="display:none;">
							<div id="regionDetailsAddConnectionDetailsTitle"></div>
							<div id="regionDetailsAddConnectionDetailsReportsBox"></div>
							<div id="regionDetailsAddConnectionDetailsImg" style="display:none;"><img src="img/ui/longConnection.png"/></div>
							<div id="regionDetailsAddConnectionDetailsSourceAbbrev"></div>
							<div id="regionDetailsAddConnectionDetailsSourceName"></div>
							<div id="regionDetailsAddConnectionDetailsTargetAbbrev"></div>
							<div id="regionDetailsAddConnectionDetailsTargetName"></div>
							<div id="regionDetailsAddConnectionDetailsDescription" style="display:none;">A <span id="regionDetailsAddConnectionDetailsDescriptionStrength"></span> connection was found using <span id="regionDetailsAddConnectionDetailsDescriptionTechnique"></span> injected into the <span id="regionDetailsAddConnectionDetailsDescriptionInjection"></span> with terminal fields found in the <span id="regionDetailsAddConnectionDetailsDescriptionTerminal"></span>.</div>
							<div id="regionDetailsAddConnectionDetailsDescriptionMetadata" style="display:none">Curated by <span id="regionDetailsAddConnectionDetailsDescriptionCuratorName"></span> from "<span id="regionDetailsAddConnectionDetailsDescriptionReferenceName"></span>"</div>


						</div>
					</div>
				</div>

				<div id="pins"></div>

				<div id="connections">
				</div>

				<div id="regions">
				</div>

				<div id="mapDiv">
					
					<?php
						//zoom1: 16, 10
						//zoom2: 48, 30
						for($a=1; $a<=2; $a++)
						{
							echo "<div class=\"mapColumn\">";
							for($b=1; $b<=2; $b++)
							{
								echo "<img src=\"img/map/outline/1_tile_" . $a . "_" . $b . ".png\" width=\"480\" height=\"480\"/>";
							}
							echo "</div>";
						}
					?>
				</div>

			</div>

		<!-- end master div -->
		</div>

<?php include_once('php/footer.php'); ?>
<script src="js/140215.js"></script>
<script src="js/layer/140217.js"></script>
<script src="js/regions/140215.js"></script>
<script src="js/connections/140217.js"></script>
<script src="js/connections/evidence/140217.js"></script>
<script src="js/search/140527.js"></script>
<script src="js/search/partsList.js"></script>
<script src="js/mapdata/140217.js"></script>

</html>