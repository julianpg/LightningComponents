({
    // function call on component Load
  	doInit: function(component, event, helper) {
		//load any users related to this event
      	helper.findInvitees(component, event);
        //if this event is a child find the id of the parent
      	helper.getParentEvent(component,event);
    },
 
    addNewRow: function(component, event, helper) {
		//after an invitee is added reload the invitees
        helper.findInvitees(component, event);
    },

    removeDeletedRow: function(component, event, helper) {
        // get the selected row Index to delete
        var index = event.getParam("indexVar");
        var AllRowsList = component.get("v.EventRelationList");
        AllRowsList.splice(index, 1);
		
        //Remove the row selected, deletion of record gets handled on child component
        var indexNumber = component.get("v.IndexNumber") - 1;
        component.set("v.IndexNumber",indexNumber);
        component.set("v.EventRelationList", AllRowsList);
    },
    
    goToParentEvent: function(component,event,helper){      
        //link to parent record if on child
        var eventId = component.get("v.ParentEvent.Id");
        var navEvt = $A.get("e.force:navigateToSObject");
            navEvt.setParams({
          		"recordId": eventId,
          		"slideDevName": "detail"
    	});
    	navEvt.fire();
	}

})