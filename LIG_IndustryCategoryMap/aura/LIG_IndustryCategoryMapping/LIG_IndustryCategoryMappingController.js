({
    doInit: function(component,event,helper) {
        
         helper.validateUser(component, event);//check if the user is a VDT member
         helper.getParentAndSubCategories(component, event);//call server to get picklist values for parent and sub
         helper.getMinorCategories(component, event); //call server to get picklist values for minor      
    },
    
    onControllerFieldChange: function(component, event, helper) {
        // get selected controller field value
        var controllerValueKey = event.getSource().get("v.value"); 
        var depnedentFieldMap = component.get("v.depnedentFieldMap");
        component.set("v.displayIndustry",false);//hide the default value of the industry picklist
        if (controllerValueKey != '--- None ---') {
            var ListOfDependentFields = depnedentFieldMap[controllerValueKey];
            
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledDependentFld", false);//enable edit on sub category
                component.set("v.fields.Industry_Sub_Category__c","---None---");//reset picklist
                component.set("v.fields.Industry_Minor_Category__c","---None---");//reset picklist
                helper.fetchDepValues(component, ListOfDependentFields,"v.subPicklistVal");//get the dependent field values
                //check if the save button is enabled and disable to prevent users from saving ---none--- values
                if(!component.get("v.disableSave")){
                   component.set("v.disableSave",true);
                }
            }else{
                //if there are no dependent fields show the below
                component.set("v.bDisabledDependentFld", true); 
                component.set("v.subPicklistVal", ['--- None ---']);
                component.set("v.minorPicklistVal", ['--- None ---']);
            }  
            
        } else {
            //if there are no dependent fields show the below
            component.set("v.bDisabledDependentFld", true);
            component.set("v.subPicklistVal", ['--- None ---']);
            component.set("v.minorPicklistVal", ['--- None ---']);          
        }
    },
    
    onSubControllerFieldChange: function(component, event, helper) {     
        var controllerValueKey = event.getSource().get("v.value"); // get selected controller field value
        var subdepnedentFieldMap = component.get("v.subDepnedentFieldMap");
        component.set("v.displaySubCateg",false);
        if (controllerValueKey != '--- None ---') {
            //get the picklist values based on the key
            var ListOfDependentFields = subdepnedentFieldMap[controllerValueKey];
            if(!component.get("v.disableSave")){
                component.set("v.disableSave",true);
                component.set("v.fields.Industry_Minor_Category__c","--- None ---");
                component.set("v.minorPicklistVal", ['--- None ---']);
            }
            if(ListOfDependentFields.length > 0){
                component.set("v.bDisabledSubDependentFld", false); //enable edit on minor category
                //get the values for the minor category picklist
                 
                helper.fetchDepValues(component, ListOfDependentFields,"v.minorPicklistVal"); 
            }else{
                //if there are not values disbable edit and reset picklist
                component.set("v.bDisabledSubDependentFld", true); 
                component.set("v.minorPicklistVal", ['--- None ---']);
            }  
            
        } else {
            //if there are not values disbable edit and reset picklist
            component.set("v.bDisabledDependentFld", true);
            component.set("v.minorPicklistVal", ['--- None ---']);            
        }
    },
    
    onSubDependentFieldChange: function(component, event, helper){
        //if the minor category value changes then we can enable save button
        component.set("v.displayMinorCat",false);
        component.set("v.disableSave",false);
    },
    
    edit: function(component,event,helper) {
        component.set("v.bDisabledParentDependentFld", false);//enable edit on industry picklist
        component.set("v.bDisabledDependentFld", false);//enable edit on sub category
        component.set("v.showEdit", false);//hide the edit button
        component.set("v.showCancel", true);//show the cancel button
        
        
        if(component.get("v.disableSave")){
            //first time they click on edit we want to enable edit on industry and show the current value of the record if there is one
            if(component.get("v.fields.Industry")!=null){
                var controllerValueKey = component.get("v.fields.Industry"); 
                var depnedentFieldMap = component.get("v.depnedentFieldMap");
                var ListOfDependentFields = depnedentFieldMap[controllerValueKey];
                helper.fetchDepValues(component, ListOfDependentFields,"v.subPicklistVal");
            }
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