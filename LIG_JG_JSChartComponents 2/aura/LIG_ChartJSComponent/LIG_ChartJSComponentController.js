({
	loadChart : function(component, event, helper) {
		
        var reportType = component.get("v.report");
        
        if(reportType == 'Open Opportunities'){
            helper.OpenOpportunities(component);
        }else if(reportType == 'Closed Won Opportunities'){
            helper.WonOpportunities(component);
        }else if(reportType == 'Closed Won By Product'){
            helper.WonOpportunitiesByProduct(component);
        }else if(reportType == 'Closed Lost Analysis'){
            helper.ClosedLostAnalysis(component);
        }
	},
    
    getSourceReport : function(component, event, helper){
        var reportName = component.get("v.sourceReport");
        console.log("reportName::"+reportName);
        var action = component.get("c.getReport");
        	
        	action.setParams({"name":reportName});
        	action.setCallback(this, function(response) {
            var state = response.getState();           
                if (state === "SUCCESS") {
                    var reportId = response.getReturnValue();
                    var name = component.get("v.fields.Id");
                    var urlEvent = $A.get("e.force:navigateToURL");
                    urlEvent.setParams({
                       "url": "/lightning/r/Report/"+reportId+"/view?fv0="+name
                    });
                    urlEvent.fire();
                }
            });
        
        $A.enqueueAction(action);
    }
})