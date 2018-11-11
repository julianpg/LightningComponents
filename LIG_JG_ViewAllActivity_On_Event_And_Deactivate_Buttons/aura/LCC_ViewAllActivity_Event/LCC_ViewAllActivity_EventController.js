({
	execute : function(component, event, helper) {
       
		var urlToNavigate = window.parent.location.href = '/apex/ViewAllAccountActivityWithinTask?id='+component.get('v.recordId');
		
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({"url": urlToNavigate});
        urlEvent.fire();
  
       $A.get("e.force:closeQuickAction").fire();   
	}
})