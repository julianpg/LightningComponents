({
        
    createObjectData: function(component, event) {
        //create a template record for an event invitee of type = user
        var RowItemList = component.get("v.EventRelationList");
        RowItemList.push({
                        'sobjectType': 'User',
                        'FirstName':'',
                        'LastName': ''
                    });   
        component.set("v.EventRelationList", RowItemList);
    },
    
    findInvitees: function(component, event){      
        //call to the server side controller to find the invitees
        var action = component.get("c.Invitees");
            action.setParams({
                "eventId": component.get("v.recordId")
            });
            // set call back 
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
            
                    var res = response.getReturnValue();
                    var index = res.length + 1;
                    console.log('List of invitees::'+res);
                    component.set("v.EventRelationList",res);
                    component.set("v.IndexNumber",index);
                    
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
    },
    
    getParentEvent: function(component, event){
        //if child record find the parent id
        var action = component.get("c.parentEvent");
        action.setParams({
            "eventId": component.get("v.recordId")
        });
        // set call back 
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {  
                
                var res = response.getReturnValue();
                if(res != null){
                    console.log('ParentEvent::'+res);
                    component.set("v.ParentEvent",res); 
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
})