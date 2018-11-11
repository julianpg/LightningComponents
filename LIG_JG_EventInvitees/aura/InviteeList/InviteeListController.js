({
    removeRow : function(component, event, helper){
     // fire the DeleteRowEvt Lightning Event and pass the deleted Row Index to Event parameter/attribute       
       var action = component.get("c.deleteInvitee");
            action.setParams({
                "eId": component.get("v.EventId"),
                "uId": component.get("v.EventRelationInstance.Id")
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") { 
                    
                	var res = response.getReturnValue();
                    //Check if the record deleted correctly
                    if(res.includes("Deleted")){
                        component.getEvent("DeleteRowEvt").setParams({"indexVar" : component.get("v.rowIndex") }).fire();
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Invitee Deleted',
                            message: ' ',
                            duration:' 4000',
                            key: 'info_alt',
                            type: 'warning',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }else{
                        //display an error if record couldn't be deleted
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
                    //display error if server side controller couldn't be reached
                      var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : 'Error',
                            message:response,
                            duration:' 5000',
                            key: 'info_alt',
                            type: 'error',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                }
                
            });
          $A.enqueueAction(action);  
    },
    openModal: function(component, event, helper) {
      //Display popup,set the "isOpen" attribute to "true"
      component.set("v.isOpen", true);
   },
 
   closeModal: function(component, event, helper) {
      //Hide/Close popup,set the "isOpen" attribute to "Fasle"  
      component.set("v.isOpen", false);
   },
 
   delete: function(component, event, helper) {
      // Display popup message and set set the "isOpen" attribute to "False for close the model Box.
      component.set("v.isOpen", false);
      $A.enqueueAction(component.get('c.removeRow'));

   },
})