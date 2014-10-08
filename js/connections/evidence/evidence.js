function ConnectionEvidence(sourceID, sourceName, sourceAbbrev, targetID, targetName, targetAbbrev, nomenclature, strengthID, injectionSiteID, terminalFieldID, techniqueID, annotation, referenceName, referenceURL, detailsURL)
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
	this.strengthID = strengthID;
	this.injectionSiteID = injectionSiteID;
	this.terminalFieldID = terminalFieldID;
	this.techniqueID = techniqueID;
	this.annotation = annotation;
	this.referenceName = referenceName;
	this.referenceURL = referenceURL;
	this.detailsURL = detailsURL;
}