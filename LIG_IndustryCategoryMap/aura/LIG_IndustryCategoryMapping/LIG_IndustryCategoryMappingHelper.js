({
    getParentAndSubCategories : function(component, event) {       
        var action = component.get("c.subCategories");
        action.setCallback(this, function(response) {            
            if (response.getState() == "SUCCESS") {               
                var StoreResponse = response.getReturnValue();
                //lets isolate the parent category
                var keys = Object.keys(StoreResponse);
                keys.sort();//sort them in order               
                component.set("v.parentPicklistVal",keys);
                component.set("v.depnedentFieldMap",StoreResponse);             
            }else{
                alert('Something went wrong getting the parent and sub categories');
            }
        });
        $A.enqueueAction(action);
    },
    
    getMinorCategories : function(component, event) {        
        var action = component.get("c.minorCategories");
        action.setCallback(this, function(response) {           
            if (response.getState() == "SUCCESS") {               
                var StoreResponse = response.getReturnValue();
                component.set("v.subDepnedentFieldMap",StoreResponse);             
            }else{
                alert('Something went wrong getting the minor categories');
            }
        });
        $A.enqueueAction(action);
    },
    
    fetchDepValues: function(component, ListOfDependentFields, lstAttrName) {
        // create a empty array var to store dependent picklist values for controller field  
        var dependentFields = [];
        
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            dependentFields.push(ListOfDependentFields[i]);
        }
        if(lstAttrName === "v.subPicklistVal"){
           component.set("v.bDisabledSubDependentFld", true);
           
        }
        // set the dependentFields variable values to store(dependent picklist field) on lightning:select
        component.set(lstAttrName, dependentFields);        
    },
    
    validateUser: function(component,event){        
        //we will check if the user is a VDT member
        var action = component.get("c.VDTuser");
        action.setCallback(this, function(response) {           
            if (response.getState() == "SUCCESS") {               
                var res = response.getReturnValue();
                component.set("v.editAllowed",res);             
            }else{
                alert('Something went wrong validating the user');
            }
        });
        $A.enqueueAction(action);
    }
})