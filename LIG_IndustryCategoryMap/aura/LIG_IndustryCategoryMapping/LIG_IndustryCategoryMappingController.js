({
    doInit: function(component,event,helper) {
        //validate and get the data we need from the server
        helper.validateUser(component, event);
        helper.getParentAndSubCategories(component, event);
        helper.getMinorCategories(component, event);       
    },
    
    onControllerFieldChange: function(component, event, helper) {
        // get selected controller field value
        var controllerValueKey = event.getSource().get("v.value"); 
        var depnedentFieldMap = component.get("v.depnedentFieldMap");
        
        if (controllerValueKey != '--- None ---') {
            var ListOfDependentFields = depnedentFieldMap[controllerValueKey];
            
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledDependentFld", false);  
                helper.fetchDepValues(component, ListOfDependentFields,"v.subPicklistVal");    
            }else{
                component.set("v.bDisabledDependentFld", true); 
                component.set("v.subPicklistVal", ['--- None ---']);
                component.set("v.minorPicklistVal", ['--- None ---']);
            }  
            
        } else {
            component.set("v.bDisabledDependentFld", true);
            component.set("v.subPicklistVal", ['--- None ---']);
            component.set("v.minorPicklistVal", ['--- None ---']);          
        }
    },
    
    onSubControllerFieldChange: function(component, event, helper) {     
        var controllerValueKey = event.getSource().get("v.value"); // get selected controller field value
        var subdepnedentFieldMap = component.get("v.subDepnedentFieldMap");
        if (controllerValueKey != '--- None ---') {
            var ListOfDependentFields = subdepnedentFieldMap[controllerValueKey];
            
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledSubDependentFld", false);  
                helper.fetchDepValues(component, ListOfDependentFields,"v.minorPicklistVal");    
            }else{
                component.set("v.bDisabledSubDependentFld", true); 
                component.set("v.minorPicklistVal", ['--- None ---']);
            }  
            
        } else {
            component.set("v.bDisabledDependentFld", true);
            component.set("v.minorPicklistVal", ['--- None ---']);            
        }
    },
    
    onSubDependentFieldChange: function(component, event, helper){
        component.set("v.disableSave",false);
    },
    
    edit: function(component,event,helper) {
        component.set("v.bDisabledParentDependentFld", false);
        component.set("v.showEdit", false);
        component.set("v.showCancel", true);
        
        if(component.get("v.disableSave")){           
            component.set("v.fields.Industry","00 - Please Select");
            component.set("v.fields.Industry_Sub_Category__c","---None---");
            component.set("v.fields.Industry_Minor_Category__c","---None---");
        }
   	},
    
    save: function(component, event, helper){
    	component.set("v.disableSave",true);
        component.set("v.showCancel", false);
        component.find("recordLoader").saveRecord($A.getCallback(function(saveResult) {            
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                component.set("v.bDisabledParentDependentFld", true); 
                component.set("v.bDisabledDependentFld", true);
                component.set("v.bDisabledSubDependentFld", true);
                
                component.set("v.showEdit", true);
        		component.set("v.showCancel", false);
                
                $A.get('e.force:refreshView').fire();
                                
            } else if (saveResult.state === "INCOMPLETE") {
                component.set("v.disable",false);
                component.set("v.showCancel", true);
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                component.set("v.disable",false);
                component.set("v.showCancel", true);
                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
            } else {
        		component.set("v.disable",false);
                component.set("v.showCancel", true);
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
       }));
	},
    
    cancel: function(component, event, helper){
        
        //reset the picklist values
        component.find("recordLoader").reloadRecord(true); 
        
        //Make picklists inactive
        component.set("v.bDisabledParentDependentFld", true); 
        component.set("v.bDisabledDependentFld", true);
        component.set("v.bDisabledSubDependentFld", true); 
        
        //Hide cancel and show edit
        component.set("v.showEdit", true);
        component.set("v.showCancel", false);
        component.set("v.disableSave",true);
                
    },
    
    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // get the fields that changed for this record
            var changedFields = eventParams.changedFields;
            // if categories is changed then display message
            if('Industry_Minor_Category__c' in changedFields){            
                var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "mode":"dismissible",
                        "duration":7000,
                        "type":"success",
                        "title": "Saved",
                        "message": "The categories were saved."
                    });
                    resultsToast.fire();
            }

        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted and removed from the cache
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving or deleting the record
        }
    }
})