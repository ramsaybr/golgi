//Connection 'class' constructor function
function ConnectionEvidence(sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, strength, injectionLocation, terminalFieldLocation, technique, annotation, curator, referenceName, referenceURL)
{
	console.log("in connectionEvidence constructor");

	//declare properties, set from construction arguments
	this.type = "ConnectionEvidence";
	this.sourceID = sourceID;
	this.sourceName = sourceName;
	this.sourceAbbrev = sourceAbbrev;
	this.targetID = targetID;
	this.targetName = targetName;
	this.targetAbbrev = targetAbbrev;
	this.nomenclature = nomenclature;
	this.strength = strength;
	this.injectionLocation = injectionLocation;
	this.terminalFieldLocation = terminalFieldLocation;
	this.technique = technique;
	this.annotation = annotation;
	this.curatorName = curator;
	this.referenceName = referenceName;
	this.referenceURL = referenceURL;

	console.log(this.injectionLocation);
}