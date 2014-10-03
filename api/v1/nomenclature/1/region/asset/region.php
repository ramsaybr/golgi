<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

include('../../../../asset/config.php');
// $config = Array(
//     'database' => Array(
//         'db_username' => "root",
//         'db_userpassword' => "root",
//         'db_name' => "flatmap",
//         'db_host' => "localhost",
//         'db_port' => "8888"
//     )
// );
$link = mysql_connect($config['database']['db_host'], $config['database']['db_username'], $config['database']['db_userpassword']) or die("Cannot connect");
		mysql_select_db($config['database']['db_name']);

class Region
{
	private $regionID = 0;
	private $name = "";
	private $abbreviation = "";
	private $nomeclatureID = 0;
	private $nomenclatureName = "";
	private $speciesID = 0;
	private $speciesName = "";
	private $otherNomenclature = false;
	private $interaction1X = 0;
	private $interaction1Y = 0;
	private $interaction2X = 0;
	private $interaction2Y = 0;
	private $interaction3X = 0;
	private $interaction3Y = 0;
	private $interaction4X = 0;
	private $interaction4Y = 0;
	private $width1 = 0;
	private $height1 = 0;
	private $width2 = 0;
	private $height2 = 0;
	private $width3X = 0;
	private $height3 = 0;
	private $width4X = 0;
	private $height4 = 0;
	private $X1 = 0;
	private $Y1 = 0;
	private $X2 = 0;
	private $Y2 = 0;
	private $X3 = 0;
	private $Y3 = 0;
	private $X4 = 0;
	private $Y4 = 0;

	public function __construct($path)
	{
		//create database link
		
		//Find region based on abbrev, nomenclature
		$explodePath = explode('/', $path);
		$region = $explodePath[count($explodePath)-1];
		$nomenclature = $explodePath[count($explodePath)-3];
		$findRegionQ = mysql_fetch_assoc(mysql_query("SELECT * FROM region WHERE abbreviation='" . $region . "' AND nomenclatureID='" . $nomenclature . "'"));
		
		$this->regionID = $findRegionQ['regionID'];
		$this->name = $findRegionQ['name'];
		$this->abbreviation = $findRegionQ['abbreviation'];
		$this->nomeclatureID = $findRegionQ['nomenclatureID'];
		$this->speciesID = $findRegionQ['speciesID'];
		$this->otherNomenclature = $findRegionQ['otherNomenclature'];
		$this->interaction1X = $findRegionQ['interaction1X'];
		$this->interaction1Y = $findRegionQ['interaction1Y'];
		$this->interaction2X = $findRegionQ['interaction2X'];
		$this->interaction2Y = $findRegionQ['interaction2Y'];
		$this->interaction3X = $findRegionQ['interaction3X'];
		$this->interaction3Y = $findRegionQ['interaction3Y'];
		$this->interaction4X = $findRegionQ['interaction4X'];
		$this->interaction4Y = $findRegionQ['interaction4Y'];
		$this->width1 = $findRegionQ['width1'];
		$this->height1 = $findRegionQ['height1'];
		$this->width2 = $findRegionQ['width2'];
		$this->height2 = $findRegionQ['height2'];
		$this->width3 = $findRegionQ['width3'];
		$this->height3 = $findRegionQ['height3'];
		$this->width4 = $findRegionQ['width4'];
		$this->height4 = $findRegionQ['height4'];
		$this->X1 = $findRegionQ['X1'];
		$this->Y1 = $findRegionQ['Y1'];
		$this->X2 = $findRegionQ['X2'];
		$this->Y2 = $findRegionQ['Y2'];
		$this->X3 = $findRegionQ['X3'];
		$this->Y3 = $findRegionQ['Y3'];
		$this->X4 = $findRegionQ['X4'];
		$this->Y4 = $findRegionQ['Y4'];

		//find nomenclature name
		$findNomenQ = mysql_fetch_assoc(mysql_query("SELECT * FROM nomenclature WHERE nomenclatureID='" . $this->nomeclatureID . "'"));
		$this->nomenclatureName = $findNomenQ['name'];

		//find species name
		$findSpeciesQ = mysql_fetch_assoc(mysql_query("SELECT * FROM species WHERE speciesID='" . $this->speciesID . "'"));
		$this->speciesName = $findSpeciesQ['name'];
	}

	public function getData()
	{
		$jsonArray = array();
		$jsonArray['type'] = "Region";
		$jsonArray['bamsID'] = $this->regionID;
		$jsonArray['name'] = $this->name;
		$jsonArray['abbreviation'] = $this->abbreviation;
		$jsonArray['nomenclature'] = $this->nomenclatureName;
		$jsonArray['species'] = $this->speciesName;
		$jsonArray['otherNomenclature'] = $this->otherNomenclature;
		$jsonArray['interaction1X'] = $this->interaction1X;
		$jsonArray['interaction1Y'] = $this->interaction1Y;
		$jsonArray['interaction2X'] = $this->interaction2X;
		$jsonArray['interaction2Y'] = $this->interaction2Y;
		$jsonArray['interaction3X'] = $this->interaction3X;
		$jsonArray['interaction3Y'] = $this->interaction3Y;
		$jsonArray['interaction4X'] = $this->interaction4X;
		$jsonArray['interaction4Y'] = $this->interaction4Y;
		$jsonArray['width1'] = $this->width1;
		$jsonArray['height1'] = $this->height1;
		$jsonArray['width2'] = $this->width2;
		$jsonArray['height2'] = $this->height2;
		$jsonArray['width3'] = $this->width3;
		$jsonArray['height3'] = $this->height3;
		$jsonArray['width4'] = $this->width4;
		$jsonArray['height4'] = $this->height4;
		$jsonArray['X1'] = $this->X1;
		$jsonArray['Y1'] = $this->Y1;
		$jsonArray['X2'] = $this->X2;
		$jsonArray['Y2'] = $this->Y2;
		$jsonArray['X3'] = $this->X3;
		$jsonArray['Y3'] = $this->Y3;
		$jsonArray['X4'] = $this->X4;
		$jsonArray['Y4'] = $this->Y4;
		return json_encode($jsonArray);
	}
}

?>