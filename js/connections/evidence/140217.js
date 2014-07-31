//Connection 'class' constructor function
function ConnectionEvidence(sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, strength, injectionSiteAbbrev, injectionSiteName, injectionSiteID, terminalFieldAbbrev, terminalFieldName, terminalFieldID, technique, annotation, curatorName, curatorEmail, referenceName, referenceURL)
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
	this.injectionSiteAbbrev = injectionSiteAbbrev;
	this.injectionSiteName = injectionSiteName;
	this.injectionSiteID = injectionSiteID;
	this.terminalFieldAbbrev = terminalFieldAbbrev;
	this.terminalFieldName = terminalFieldName;
	this.terminalFieldID = terminalFieldID;
	this.technique = technique;
	this.annotation = annotation;
	this.curatorName = curatorName;
	this.curatorEmail = curatorEmail;
	this.referenceName = referenceName;
	this.referenceURL = referenceURL;

	console.log(this.injectionLocation);
}