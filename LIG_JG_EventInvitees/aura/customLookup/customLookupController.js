({
    
   onfocus : function(component,event,helper){
       $A.util.addClass(component.find("mySpinner"), "slds-show");
        var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
        // Get Default 5 Records order by createdDate DESC  
         var getInputkeyWord = '';
         helper.searchHelper(component,event,getInputkeyWord);
    },
    onblur : function(component,event,helper){       
        component.set("v.listOfSearchRecords", null );
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open');
    },
    keyPressController : function(component, event, helper) {
       // get the search Input keyword   
         var getInputkeyWord = component.get("v.SearchKeyWord");
       // check if getInputKeyWord size id more then 0 then open the lookup result List and 
       // call the helper 
       // else close the lookup result List part.   
        if( getInputkeyWord.length > 0 ){
             var forOpen = component.find("searchRes");
               $A.util.addClass(forOpen, 'slds-is-open');
               $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchHelper(component,event,getInputkeyWord);
        }
        else{  
             component.set("v.listOfSearchRecords", null ); 
             var forclose = component.find("searchRes");
               $A.util.addClass(forclose, 'slds-is-close');
               $A.util.removeClass(forclose, 'slds-is-open');
          }
	},
    
  // function for clear the Record Selaction 
    clear :function(component,event,helper){
		helper.resetLookup(component,event);   
    },
    
  // This function call when the end User Select any record from the result list.   
    handleComponentEvent : function(component, event, helper) {
    // get the selected Account record from the COMPONETN event 	 
       var selectedAccountGetFromEvent = event.getParam("recordByEvent");
	   component.set("v.selectedRecord" , selectedAccountGetFromEvent); 
       
        var forclose = component.find("lookup-pill");
           $A.util.addClass(forclose, 'slds-show');
           $A.util.removeClass(forclose, 'slds-hide');
  
        var forclose = component.find("searchRes");
           $A.util.addClass(forclose, 'slds-is-close');
           $A.util.removeClass(forclose, 'slds-is-open');
        
        var lookUpTarget = component.find("lookupField");
            $A.util.addClass(lookUpTarget, 'slds-hide');
            $A.util.removeClass(lookUpTarget, 'slds-show'); 
        
        var icon = component.find("SearchIcon");
        $A.util.toggleClass(icon, "toggle");
        
           
	},
    

    AddNewRow : function(component, event, helper){
        
        console.log('EventId:::'+component.get("v.EventId"));
        console.log('RelationId2:::'+component.get("v.selectedRecord.Id"));
        
        //create the EventRelation Record using the user and eventid
        var eventRelation = {
            'sobjectType': 'EventRelation',
            'EventId': component.get("v.EventId"),
            'RelationId': component.get("v.selectedRecord.Id"),
            'IsInvitee': true
        };
        
        component.set("v.EventRelationRecord", eventRelation);
        
		// first call the helper function in if block which will return true or false.
        // this helper function check the "Invitee" will not be blank on each row.
        if (helper.validateRequired(component, event)) {
            // call the apex class method for save the Contact List
            // with pass the contact List attribute to method param.  
            var action = component.get("c.createEventAttendees");
            action.setParams({
                "Attendee": component.get("v.EventRelationRecord")
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    
                    var res = response.getReturnValue();
                    //Check if the record saved correctly
                    if(!res.includes("Error")){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Invitee Added',
                            message: ' ',
                            duration:' 4000',
                            key: 'info_alt',
                            type: 'success',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                        component.getEvent("AddRowEvt").fire(); 
                        helper.resetLookup(component,event);
                       
                    }else{
                        
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
                    
                }else if (status === "INCOMPLETE") {
                        console.log("No response from server or client is offline.")
                        // Show offline error
                }else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                        // Show error message
                }

            });
            // enqueue the server side action  
            $A.enqueueAction(action);
        }
    }
     
})