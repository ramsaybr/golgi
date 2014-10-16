<?php 
session_start();
if (isset($_COOKIE['UID'])) 
{
	if($_COOKIE['UID'] != "")
	{
		$identity = true;
	    $identityEmail = $_COOKIE['email'];
	    // $default = "http://www.somewhere.com/homestar.jpg";
	    $grav_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $identityEmail ) ) ) . "?d=" . urlencode( $default ) . "&s=40";
	}
	else
	{
		$identity = false;	
	}
} else {
	$identity = false;
}

include_once('php/header.php'); 

?>

		<div id="masterDiv">
		<!-- Begin master div -->

			<div id="ctrl">
				<div id="headerBar">
					<div id="searchDiv">
						<input type="text" class="form-control" id="searchInput" value="Search to add data to the map" onclick="clearSearch()" data-provide="typeahead"/>
						<div id="searchInputIcon"><span class="glyphicon glyphicon-search"></span></div>
						<div class="btn btn-success" id="searchButton" onclick="search(null)">Search</div>
					</div>
					<div id="searchResultsDiv">
						<div id="searchResultsClose" onclick="closeSearch()">
							<span class="glyphicon glyphicon-remove"></span>
						</div>
						<div id="searchResultsName">
						</div>
						<div id="searchResultsType">
						</div>
						<div id="searchAddToMap">
							<img id="searchAddToMapIcon" src="img/ui/pin/2_r_x_c_m.png" width="30" height="90"/>
							<div id="searchAddToMapBtn" class="btn btn-success" onclick="addRegion()"></div>
						</div>
						<div id="searchFoundData">
							I found the following data associated with the <span id="searchFoundName"></span>:
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
							<img id="searchConnectionIcon" src="img/ui/cellType-40x60.png" width="33" height="50"/>
							<div id="searchCellTypesBtn" class="btn btn-warning yellowBtn">Cell Types</div>
						</div>
						<div id="searchMyNotesLabel">
							My Notes:
						</div>
						<textarea rows="4" id="searchMyNotes"></textarea>
					</div>

					<div id="userDiv">
						
						<?php 
							if($identity)
							{
								echo "<img src='" . $grav_url . "'/> Logged in as <a style='cursor:pointer' onclick='showAccountInfo()'>" . $identityEmail . "</a>";
							}
							else
							{
								echo '<div style="padding-top:10px;"><span class="glyphicon glyphicon-user" style="padding-right:10px;"></span><a style="cursor:pointer" onclick="showCredentials()">Log in or sign up free</a></div>';
							}
						?>

					</div>

					<div id="credentials">
						<p><span style="float:right; cursor:pointer;" class="glyphicon glyphicon-remove" onclick="hideCredentials()"></span></p>
						<div id="credentialsSignInDiv">
							<p>Returning users: </p>
							<input type="text" class="form-control credentialsItem" id="credentialsEmail" placeholder="Email"/>
							<input type="password" class="form-control credentialsItem" id="credentialsEmail" placeholder="Password"/>
							<button class="btn btn-warning btn-small credentialsItem" style="width:18%; line-height: 0;">Sign in</button>
							<br><br>
						</div>
						<div id="credentialsSignUpDiv">
							<h3 id="credentialsSignUpHeader">It's fast and free to sign up</h3>
							<p id="credentialsSignUpDivText">Save your private notes on regions, connections, molecules and cells. <br>It's like scrawling your brilliant ideas in the margin of a paper. But the future.</p>
							<button class="btn btn-success btn-large" id="credentialsSignUp" onclick="signupShow()">Sign up</button>
							<input type="text" class="form-control credentialsSignUpHidden" id="credentialsSignUpEmail" placeholder="Email"/>
							<input type="password" class="form-control credentialsSignUpHidden" id="credentialsSignUpPwd1" placeholder="Password"/>
							<input type="password" class="form-control credentialsSignUpHidden" id="credentialsSignUpPwd2" placeholder="Password again (y'know - for good measure)"/>
							<div class="alert alert-danger credentialsSignUpHidden" id="credentialsSignUpAlert">
								Oops! That account is already in use. If this error persists or you think there's a mistake, please email us at usegolgi@gmail.com
							</div>
							<button class="btn btn-success btn-large credentialsSignUpHidden" id="credentialsSignUpSubmit" onclick="signupSubmit()">Create my account</button>
							
						</div>
					</div>

					<div id="accountInfo" style="display:none;">
						<button class="btn btn-sm btn-success accountInfoBtn" id="accountInfoViewNotebook">
							<span class="glyphicon glyphicon-eye-open"></span> View my notebook
						</button><br>
						<button class="btn btn-xs btn-default accountInfoBtn" id="accountInfoChangePwd">
							<span class="glyphicon glyphicon-pencil"></span> Change password
						</button><br>
						<button class="btn btn-xs btn-danger accountInfoBtn" id="accountInfoLogout" onclick="accountLogout()">
							Logout
						</button>
					</div>


					<div id="mapCtrl">
						<span id="zoomSliderIcon" class="glyphicon glyphicon-zoom-in btn-lg"></span>
						<div id="zoomSlider">
						</div>
						
					</div>
					<div id="layers">
						<div style="position:relative; left:0px; background-color: #3D3C42; top:0px; height:26px; width:100%; border-radius: 0px 0px 0px 4px; box-shadow:-1px 1px 1px 0px #222;">
							<div id="layersHeader">
								Active Data Layer: <span id="currentLayer">Layer 1</span>
							</div>
						</div>
						<div id="layerContainer">
						</div>
						<div style="position:relative; top:0px; background-color:#3D3C42; left:0px; width:100%; height:auto; padding-bottom:20px; border-radius: 4px 0px 0px 4px; box-shadow: -1px 1px 1px 0px #222;">
							<div id="layerAddLayer" class="btn btn-success" onclick="newLayer()">
								Add Layer <span class="glyphicon glyphicon-plus"></span>
							</div>
							<div style="position:relative; top:0px; left:10px; width:180px; height:30px;">
								<div class="btn btn-warning dropdown-toggle" style="width:156px; text-align:center;" data-toggle="dropdown">Adjust Map View</div>
								<ul class="dropdown-menu dropdown-inverse" role="menu" style="overflow-y: auto; min-height: 80px; max-height: 250.5999755859375px;"><li rel="0" onclick="updateMap(1)" style="cursor:pointer;"><a tabindex="-1" class=""><span class="pull-left">Outline Only</span></a></li><li rel="1" onclick="updateMap(2)" style="cursor:pointer;"><a tabindex="-1" class=""><span class="pull-left">Regions</span></a></li><li rel="2" onclick="updateMap(3)" style="cursor:pointer;"><a tabindex="-1" class=""><span class="pull-left">Regions + Names</span></a></li></ul>
							</div>
						</div>
					</div>

					<div id="layerDetails" style="display:none;">
							<img src="img/ui/connection-40x60.png" width="40" height="60" style="position:absolute; left:0px; top:0px;" id="layerDetailsIcon"/>
							<div id="layerDetailsHeader">Connections in Layer 1</div>
							<div id="layerDetailsRegionsBox" style="display:none;"></div>
							<div id="layerDetailsConnectionsBox" style="display:none"></div>
							<div id="layerDetailsClose" onclick="hideDetails()"><span class="glyphicon glyphicon-remove"></span></div>
					</div>

					<div id="regionDetails" style="display:none;">
						<div id="regionDetailsHeader"></div>
						<div id="regionDetailsActiveConnections">The <span id="regionDetailsActiveConnectionsName"></span> is in <span id="regionDetailsActiveConnectionsCount"></span> connections in this layer:</div>
						<div id="regionDetailsConnectionsBox"></div>
						<div id="regionDetailsReferences">and can be found in these papers:</div>
						<div id="regionDetailsReferencesBox"></div>
						<div id="layerDetailsClose" onclick="hideRegionDetails()" style="top:20px;"><span class="glyphicon glyphicon-remove"></span></div>
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
							<div id="layerDetailsClose" onclick="hideConnectionDetails()" style="top:20px;"><span class="glyphicon glyphicon-remove"></span></div>
					</div>

				</div>
			</div>


			<div id="intxn">
				<div id="mapData" style="display:none;">
					<div id="mapDataName">
					</div>

					<div id="mapDataDefaultCnx" class="mapDataDefault">
						<img src="img/ui/connection-40x60.png" width="20" height="30" class="mapDataIcon"/>
						<span id="mapDataActiveCnxs"></span> Connection(s) 
						<div id="mapDataDefaultCnxList">
							<div id="mapDataDefaultCnxListFlex">
							</div>
							<div class="mapDataDefaultCnxListBtn btn btn-warning yellowBtn" onclick="mapDataConnectionsModal()" style="display:none;" id="mapDataDefaultCnxListViewDetailsBtn">
								View Details
							</div>
							<div class="mapDataDefaultCnxListBtn btn btn-success" onclick="mapDataAddConnections()">
								Add new +
							</div>
						</div>
					</div>

					<div id="mapDataDefaultMols" class="mapDataDefault">
						<img src="img/ui/molecule-40x60.png" width="20" height="30" class="mapDataIcon"/>
						<span id="mapDataActiveMols"></span> molecule(s)
						<div id="mapDataDefaultMolsList">
							<div id="mapDataDefaultMolsListFlex">
							</div>
							<div class="mapDataDefaultCnxListBtn btn btn-warning yellowBtn" onclick="mapDataMoleculesModal()" style="display:none;" id="mapDataDefaultMolsListViewDetailsBtn">
								View Details
							</div>
							<div class="mapDataDefaultCnxListBtn btn btn-success" onclick="mapDataAddMolecules()">
								Add new +
							</div>
						</div>
					</div>

					<div id="mapDataDefaultCells" class="mapDataDefault">
						<img src="img/ui/cellType-40x60.png" width="20" height="30" class="mapDataIcon"/>
						<span id="mapDataActiveCells"></span> cell(s)
						<div id="mapDataDefaultCellsList">
							<div id="mapDataDefaultCellsListFlex">
							</div>
							<div class="mapDataDefaultCellsListBtn btn btn-warning yellowBtn" onclick="mapDataCellsModal()" style="display:none;" id="mapDataDefaultCellsListViewDetailsBtn">
								View Details
							</div>
							<div class="mapDataDefaultCellListBtn btn btn-success" onclick="mapDataAddCells()">
								Add new +
							</div>
						</div>
					</div>

					<div id="mapDataClose" onclick="mapDataClose()">
						<span class="glyphicon glyphicon-remove"></span>
					</div>

					<!-- Add Connection -->

					<div id="regionDetailsAddConnection" style="display:none;">
						<div id="regionDetailsAddConnectionTitle">Check connections to display:
						</div>
						<div id="regionDetailsAddConnectionInputTitle">
							<img src="img/ui/cnxInput.png" width="60" height="30" style="width:60px; height:30px; float:left; margin-right:10px;"/>
							<span id="regionDetailsAddConnectionInputCount"></span>
						</div>
						<div id="regionDetailsAddConnectionOutputTitle">
							<img src="img/ui/cnxOutput.png" width="60" height="30" style="width:60px; height:30px; float:left; margin-right:10px;"/>
							<span id="regionDetailsAddConnectionOutputCount"></span>
						</div>
						<div id="regionDetailsAddConnectionInputView">
							<form id="regionDetailsAddConnectionInputForm"></form>
						</div>
						<div id="regionDetailsAddConnectionOutputView">
							<form id="regionDetailsAddConnectionOutputForm"></form>
						</div>
						<div class="btn btn-success" id="regionDetailsAddConnectionBtn" onclick="mapDataActivateConnection()">Add Selected to Map</div>
						<div id="regionDetailsAddConnectionDetails" style="display:none;">
						</div>
					</div>

					<!-- Add Molecule -->

					<div id="regionDetailsAddMolecule" style="display:none;">
						<div id="regionDetailsAddMoleculeTitle">Check molecules to display:
						</div>
						<div id="regionDetailsAddMoleculeHeader">
							<img src="img/ui/molecule-40x60.png" style="width:20px; height:30px; float:left; margin-right:10px;"/>
							<span id="regionDetailsAddMoleculeInputCount"></span>
						</div>
						<div id="regionDetailsAddMoleculeInputView">
							<form id="regionDetailsAddMoleculeInputForm"></form>
						</div>
						
						<div class="btn btn-success" id="regionDetailsAddMoleculeBtn" onclick="mapDataActivateMolecule()">Add Selected to Map</div>
						<div id="regionDetailsAddMoleculeDetails" style="display:none;">
						</div>
					</div>

					<!-- Add Cell -->

					<div id="regionDetailsAddCell" style="display:none;">
						<div id="regionDetailsAddCellTitle">Check cell types to display:
						</div>
						<div id="regionDetailsAddCellHeader">
							<img src="img/ui/cellType-40x60.png" style="width:20px; height:30px; float:left; margin-right:10px;"/>
							<span id="regionDetailsAddCellCount"></span>
						</div>
						<div id="regionDetailsAddCellInputView">
							<form id="regionDetailsAddCellInputForm"></form>
						</div>
						
						<div class="btn btn-success" id="regionDetailsAddCellBtn" onclick="mapDataActivateCells()">Add Selected to Map</div>
						<div id="regionDetailsAddCellDetails" style="display:none;">
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

		<div class="modal fade" id="cnxDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel">Please select a report below:</h4>
		      </div>
		      <div class="modal-body">
		      	<div id="regionDetailsAddConnectionDetailsReportsBox">
		      	</div>
		      	<br>
		        <center>
	        		<img src="img/ui/longConnection.png"/>
	        		<div id="regionDetailsAddConnectionDetailsLabels">
	        			<div id="regionDetailsAddConnectionDetailsSourceAbbrev"></div>
						<div id="regionDetailsAddConnectionDetailsConnectionNames"></div>
						<div id="regionDetailsAddConnectionDetailsTargetAbbrev"></div>
	        		</div>
        		</center>
				<div id="regionDetailsAddConnectionDetailsDescription">
				</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>

		
		<div class="modal fade" id="regionCnxDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog" style="width:900px; height:600px;">
		    <div class="modal-content" style="height:600px;">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel">Connectivity currently displayed for <span id="regionCnxDetailsName"></span>:</h4>
		      </div>
		      <div class="modal-body">
		      	<div id="regionCnxDetailCnxBox">
		      	</div>
		      	<div id="regionCnxDetailDescription" style="display:none;">
		      		<div id="regionCnxDetailReportsBox">
			      	</div>
			      	<br>
			        <center>
		        		<img src="img/ui/longConnection.png"/>
		        		<div id="regionCnxDetailLabels">
		        			<div id="regionCnxDetailLabelsConnectionAbbrevs"></div>
							<div id="regionCnxDetailLabelsConnectionNames"></div>
		        		</div>
	        		</center>
					<div id="regionCnxDetailDescriptionText">
					</div>
		      	</div>
		      	<div id="regionCnxDetailNotes">
		      	</div>
		      </div>
		    </div>
		  </div>
		</div>

		<!-- Molecule details modals -->

		<div class="modal fade" id="molDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel">Molecule Details</h4>
		      </div>
		      <div class="modal-body">
		        <center>
	        		<img src="img/ui/molecule.png" width="100" height="150"/>
	        		<div id="regionDetailsAddMoleculeDetailsLabel">
						<div id="regionDetailsAddMoleculeName"></div>
	        		</div>
        		</center>
				<div id="regionDetailsAddMoleculeDescription">
				</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>

		<!-- All Molecules Details -->
		<div class="modal fade" id="regionMolsDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog" style="width:900px; height:600px;">
		    <div class="modal-content" style="height:600px;">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel">Molecules currently displayed for <span id="regionMolsDetailsName"></span>:</h4>
		      </div>
		      <div class="modal-body">
		      	<div id="regionMolsDetailMolsBox">
		      	</div>
		      	<div id="regionMolsDetailDescription" style="display:none;">
			        <center>
		        		<img src="img/ui/molecule.png" width="100" height="150"/>
		        		<div id="regionMolsDetailLabels">
							<div id="regionMolsDetailLabelsName"></div>
		        		</div>
	        		</center>
					<div id="regionMolsDetailDescriptionText">
					</div>
		      	</div>
		      	<div id="regionMolsDetailNotes">
		      	</div>
		      </div>
		    </div>
		  </div>
		</div>

		<!-- Cell details modals -->

		<div class="modal fade" id="cellDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel">Cell Details</h4>
		      </div>
		      <div class="modal-body">
		        <center>
	        		<img src="img/ui/cellType.png" width="100" height="150"/>
	        		<div id="regionDetailsAddCellDetailsLabel">
						<div id="regionDetailsAddCellName"></div>
	        		</div>
        		</center>
				<div id="regionDetailsAddCellDescription">
				</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>

		<!-- All Cells Details -->
		<div class="modal fade" id="regionCellsDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		  <div class="modal-dialog" style="width:900px; height:600px;">
		    <div class="modal-content" style="height:600px;">
		      <div class="modal-header">
		        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
		        <h4 class="modal-title" id="myModalLabel">Cells currently displayed for <span id="regionCellsDetailsName"></span>:</h4>
		      </div>
		      <div class="modal-body">
		      	<div id="regionCellsDetailCellsBox">
		      	</div>
		      	<div id="regionCellsDetailDescription" style="display:none;">
			        <center>
		        		<img src="img/ui/cellType.png" width="100" height="150"/>
		        		<div id="regionCellsDetailLabels">
							<div id="regionCellsDetailLabelsName"></div>
		        		</div>
	        		</center>
					<div id="regionCellsDetailDescriptionText">
					</div>
		      	</div>
		      	<div id="regionCellsDetailNotes">
		      	</div>
		      </div>
		    </div>
		  </div>
		</div>

<?php include_once('php/footer.php'); ?>
<script src="js/main.js"></script>
<script src="js/layer/layer.js"></script>
<script src="js/regions/regions.js"></script>
<script src="js/connections/connections.js"></script>
<script src="js/connections/evidence/evidence.js"></script>
<script src="js/molecules/molecules.js"></script>
<script src="js/cells/cells.js"></script>
<script src="js/search/search.js"></script>
<script src="js/search/partsList.js"></script>
<script src="js/mapdata/mapData.js"></script>
<script src="js/user/utf8_encode.js"></script>
<script src="js/user/sha1.js"></script>
<script src="js/user/md5.js"></script>
<script src="js/user/signup.js"></script>
<script src="js/user/account.js"></script>
</html>