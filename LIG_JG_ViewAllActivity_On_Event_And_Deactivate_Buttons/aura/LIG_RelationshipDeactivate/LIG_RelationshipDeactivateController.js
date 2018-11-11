({
   close: function(component, event, helper) {
 
      $A.get("e.force:closeQuickAction").fire();
   },
   
   deactivate: function(component, event, helper) {
        var isActive = component.get("v.fields.Active__c");
       console.log('isActive::'+isActive);
      	if(isActive){
            var action = component.get("c.deactivateRelationshipContacts");
            action.setParams({
                "rId": component.get("v.recordId")               
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") { 
					var res = response.getReturnValue();
                    console.log('response:::'+res);
                    if(res === 'Success' || res === 'No Child Records'){
                        component.set("v.fields.Active__c",false);    	       
                        component.find("recordLoader").saveRecord($A.getCallback(function(saveResult) {
                            // NOTE: If you want a specific behavior(an action or UI behavior) when this action is successful 
                            // then handle that in a callback (generic logic when record is changed should be handled in recordUpdated event handler)
                            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                                $A.get("e.force:closeQuickAction").fire();   
                            } else if (saveResult.state === "INCOMPLETE") {
                                console.log("User is offline, device doesn't support drafts.");
                            } else if (saveResult.state === "ERROR") {
                                console.log('Problem saving record, error: ' + JSON.stringify(saveResult.error));
                            } else {
                                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
                            }
                        }));
                    }else{
                        
                        $A.get("e.force:closeQuickAction").fire();
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error',
                            message:res,
                            duration:' 5000',
                            key: 'info_alt',
                            type: 'error',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
                }else{
                    console.log("here");
                }
            });
            $A.enqueueAction(action); 
        }else{
            component.set("v.isOpen",false);
        }
    },

    handleRecordUpdated: function(component, event, helper) {
        var eventParams = event.getParams();
        if(eventParams.changeType === "CHANGED") {
            // get the fields that changed for this record
            var changedFields = eventParams.changedFields;
            console.log('Fields that are changed: ' + JSON.stringify(changedFields));
            // record is changed, so refresh the component (or other component logic)
            var resultsToast = $A.get("e.force:showToast");
            resultsToast.setParams({
                "title": "Saved",
                "message": "The record was deactivated."
            });
            resultsToast.fire();

        } else if(eventParams.changeType === "LOADED") {
            // record is loaded in the cache
        } else if(eventParams.changeType === "REMOVED") {
            // record is deleted and removed from the cache
        } else if(eventParams.changeType === "ERROR") {
            // there’s an error while loading, saving or deleting the record
        }
    }
})