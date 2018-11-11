({
	OpenOpportunities : function(component) {
        
        var chartCanvas = component.find("chart").getElement();
       
        	var accId = component.get("v.recordId");
        	console.log("AccountID"+accId);
            var action = component.get("c.openOpportunities");
        	
        	action.setParams({"accId":accId});
        	action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log("response::"+JSON.stringify(response.getReturnValue()));
                
                //set report title
                //component.set("v.reportTitle","Agency's Open Opportunities by Owner");
                var chartData = [];
                var chartLabels = [];
                if(resultData.length > 0){
                    for(var i=0; i < (resultData.length); i++){
                        
                        if(resultData[i].expr0 > 0){
                            var labelTemp = resultData[i].Name;
                            chartLabels.push(labelTemp);
                            
                            //Collect all values for Chart.js data
                            var valueTemp = resultData[i].expr0;
                            chartData.push(valueTemp);
                        }
                    }
                           
                    //Construct chart
                    var chart = new Chart(chartCanvas,{
                        type: 'bar',
                        data: {
                            labels: chartLabels,
                            datasets: [
                                {	
                                    label:"Amount",
                                    data: chartData,
                                    backgroundColor:"#3498DB"     
                                }
                            ]
                        },
                        options:{
                            legend: {
                                display: false
                            },
                            tooltips: {       
                                enabled: true,
                                mode: 'single',
                                callbacks: {
                                    title: function (tooltipItem, data) { 
                                        return data.labels[tooltipItem[0].index]; 
                                    },
                                    label: function(tooltipItem, data) { 
                                        var amount =  data['datasets'][0]['data'][tooltipItem['index']];
                                        var value = amount.toString();
                                        var currencyAmount = '';
                                        if(value.length<=6){
                                                currencyAmount = '£' + value/1e3+'K';
                                            }else if(value.length > 6 < 10){
                                                currencyAmount = '£' + value/1e6+'M';
                                            }else{
                                                currencyAmount = '£' + value/1e9+'B';
                                            }
                                        
                                        return currencyAmount;
                                    }
                                }
                            },  
                            responsive: true,
                            scales:{
                                xAxes:[
                                {  
                                   barPercentage: 0.6,
                                   barThickness:'flex',
                                   ticks:{},
                                   scaleLabel: {
                                        display: true,
                                        labelString: 'Pitch Owner'
                                   }, 
                                }
                            ],
                                yAxes:[
                                    {
                                        ticks:{
                                            beginAtZero:true,
                                            userCallback: function(value, index, values) {
                                                value = value.toString();
                                                return '£' + value/1e3+'K';
                                            }
                                        },
                                        scaleLabel: {
                                            display: true,
                                            labelString: 'Sum of Amount'
                                        },
                                    }
                                ]
                            },
    
                        }
                    });
            }else{
                component.set("v.NoData",true);
            }
            
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message on createReport: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
		
	},
    
    WonOpportunities : function(component){
        
        var chartCanvas = component.find("chart").getElement();
       
        	var accId = component.get("v.recordId");
        	console.log("AccountID"+accId);
            var action = component.get("c.closedWonOpportunities");
        	
        	action.setParams({"accId":accId});
        	action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log("response::"+JSON.stringify(response.getReturnValue()));
                
                //set report title
                //component.set("v.reportTitle","Agency's Won Opportunities by Close Date");
                var chartData = [];
                var chartLabels = [];
                if(resultData.length > 0){
                    for(var i=0; i < (resultData.length); i++){
                        
                        if(resultData[i].expr0 > 0){
                            var month = '';
                            //Get the text literal of the Month
                            switch(resultData[i].month) {
                                case 1:
                                    month = 'January'
                                    break;
                                case 2:
                                    month = 'February'
                                    break;
                                case 3:
                                    month = 'March'
                                    break;
                                case 4:
                                    month = 'April'
                                    break;
                                case 4:
                                    month = 'May'
                                    break;
                                case 6:
                                    month = 'June'
                                    break;
                                case 7:
                                    month = 'July'
                                    break;
                                case 8:
                                    month = 'August'
                                    break;
                                case 9:
                                    month = 'September'
                                    break;
                                case 10:
                                    month = 'October'
                                    break;
                                case 11:
                                    month = 'November'
                                    break;
                                case 12:
                                    month = 'December'
                                    break;                                
                                default:
                                    month = 'None'
                            }
                            
                            //get the last two digits of the year
                            var year = resultData[i].year.toString().slice(-2); 
                            
                            //create label ie October 18
                            var labelTemp = month +' '+year;
                            chartLabels.push(labelTemp);
                            
                            //Collect all values for Chart.js data
                            var valueTemp = resultData[i].expr0;
                            chartData.push(valueTemp);
                        }
                    }
              
                    
                    //Construct chart
                    var chart = new Chart(chartCanvas,{
                        type: 'bar',
                        data: {
                            labels: chartLabels,
                            datasets: [
                                {	
                                    label:"Amount",
                                    data: chartData,
                                    backgroundColor:"#3498DB"
                                }
                            ]
                        },
                        options:{
                            legend: {
                                display: false
                            },
                            tooltips: {       
                                enabled: true,
                                mode: 'single',
                                callbacks: {
                                    title: function (tooltipItem, data) { 
                                        return data.labels[tooltipItem[0].index]; 
                                    },
                                    label: function(tooltipItem, data) { 
                                        var amount =  data['datasets'][0]['data'][tooltipItem['index']];
                                        var value = amount.toString();
                                        var currencyAmount = '';
                                        if(value.length<=6){
                                                currencyAmount = '£' + value/1e3+'K';
                                            }else if(value.length > 6 < 10){
                                                currencyAmount = '£' + value/1e6+'M';
                                            }else{
                                                currencyAmount = '£' + value/1e9+'B';
                                            }
                                        
                                        return currencyAmount;
                                    }
                                }
                               },  
                            responsive: true,
                            scales:{
                                xAxes:[
                                {  
                                   barThickness:'flex',
                                   barPercentage: 0.6,
                                   ticks:{},
                                   scaleLabel: {
                                        display: true,
                                        labelString: 'Close Date'
                                        }, 
                                }
                            ],
                                yAxes:[
                                    {
                                        ticks:{
                                            beginAtZero:true,
                                            userCallback: function(value, index, values) {
                                            value = value.toString();
                                            return '£' + value/1e3+'K';
                                            }
                                        },
                                        scaleLabel: {
                                        display: true,
                                        labelString: 'Sum of Amount'
                                        },
                                      }
                                ]
                            },
    
                        }
                    });
            }else{
                component.set("v.NoData",true);
            }
            
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message on createReport: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
		
	},
    
    ClosedLostAnalysis : function(component){
        
        var chartCanvas = component.find("chart").getElement();
       
        	var accId = component.get("v.recordId");
        	console.log("AccountID"+accId);
            var action = component.get("c.ClosedLostAnalysis");
        	
        	action.setParams({"accId":accId});
        	action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log("response::"+JSON.stringify(response.getReturnValue()));
                
                //set report title
                //component.set("v.reportTitle","Agency's Lost Opportunities");
                var chartData = [];
                var chartLabels = [];
                var Total = 0;
                if(resultData.length > 0){
                for(var i=0; i < (resultData.length); i++){
                                    
                    //Collect all labels for Chart.js data
                    
                    var labelTemp = resultData[i].Loss_Reason__c;
                    chartLabels.push(labelTemp);
                    
                    //Collect all values for Chart.js data
                    var valueTemp = resultData[i].expr0;
                    chartData.push(valueTemp);
                    
                    Total += resultData[i].expr0;
                    
                }
          
                //Construct chart
                var chart = new Chart(chartCanvas,{
                    type: 'doughnut',
                    data: {
                        labels: chartLabels,
                        datasets: [
                            {	                                
                                data: chartData,
                                pointStyle: 'arc',
                                backgroundColor: [
                                    "#1aa2dd",
                                    "#18335b",
                                    "#7aded8",
                                    "#1da69d",
                                    "#E67E22",
                                    "#F8C471",
                                    "#3498DB",
                                    "#00BCD4",
                                    "#D32F2F",
                                    "#82E0AA",
                                    "#AFB42B"
                                ]
                            }
                        ]
                    },
                    options:{
                       cutoutPercentage: 65,
                       pieceLabel: {
                            render: 'percentage',
                            precision: 2,
                            fontSize: 14,
    						fontStyle: 'bold',
                            fontFamily: '"Lucida Console", Monaco, monospace'
                          },
                       elements: {
                           center: {
                               text: Total,
                               color: '#060606', //Default black
                               fontStyle: 'Helvetica', //Default Arial
                               sidePadding: 65 //Default 20 (as a percentage)
                           }
                        },
                        legend: {
        					position:'bottom',
                            labels: {
                                usePointStyle: true
                            }
    					},
						responsive: true,

                    }
                });
            }else{
                component.set("v.NoData",true);
            }
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message on createReport: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
		
	},
    
    WonOpportunitiesByProduct : function(component){
        
        var chartCanvas = component.find("chart").getElement();
       
        	var accId = component.get("v.recordId");
        	console.log("AccountID"+accId);
            var action = component.get("c.ClosedWonProductRevenue");
        	
        	action.setParams({"accId":accId});
        	action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log("response::"+JSON.stringify(response.getReturnValue()));
                
                //set report title
                //component.set("v.reportTitle","Closed Won Revenue by Product");
                var chartData = [];
                var chartLabels = [];
                var Total = 0;
				if(resultData.length > 0){
         		for(var i=0; i < (resultData.length); i++){
                    
                   
                        var labelTemp = resultData[i].Name;
                        chartLabels.push(labelTemp);
                        
                        //Collect all values for Chart.js data
                        var valueTemp = resultData[i].expr0;
                        chartData.push(valueTemp);
                        
                        Total += resultData[i].expr0;
                   
                    
                }
                var value = Total.toString();
                var totalValue = '';
                if(value.length<=6){
                	totalValue = '£' + value/1e3+'K';
                }else if(value.length > 6 < 10){
                    totalValue = '£' + value/1e6+'M';
                }else{
                    totalValue = '£' + value/1e9+'B';
                }
                //Construct chart
                var chart = new Chart(chartCanvas,{
                    type: 'doughnut',
                    data: {
                        labels: chartLabels,
                        datasets: [
                            {	                                
                                data: chartData,
                                pointStyle: 'arc',
                                backgroundColor: [
                                    "#1aa2dd",
                                    "#18335b",
                                    "#7aded8",
                                    "#1da69d",
                                    "#E67E22",
                                    "#F8C471",
                                    "#3498DB",
                                    "#00BCD4",
                                    "#D32F2F",
                                    "#82E0AA",
                                    "#AFB42B"
                                ]
                            }
                        ]
                    },
                    options:{
                      cutoutPercentage: 65,
                      tooltips: {       
                        enabled: true,
                        mode: 'single',
                        callbacks: {
                            title: function (tooltipItem, data) { 
                                return data.labels[tooltipItem[0].index]; 
                            },
                            label: function(tooltipItem, data) { 
                                var amount =  data['datasets'][0]['data'][tooltipItem['index']];
                                var value = amount.toString();
                                var currencyAmount = '';
                                if(value.length<=6){
                                        currencyAmount = '£' + value/1e3+'K';
                                    }else if(value.length > 6 < 10){
                                        currencyAmount = '£' + value/1e6+'M';
                                    }else{
                                        currencyAmount = '£' + value/1e9+'B';
                                    }
                                
                                return currencyAmount;
                            }
                        }
                       },                        
                       pieceLabel: {
                            render: 'percentage',
                            precision: 2,
                            fontSize: 14,
    						fontStyle: 'bold',
                            fontFamily: '"Lucida Console", Monaco, monospace'
                       },
                       elements: {
                           center: {
                               text: totalValue,
                               color: '#060606', //Default black
                               fontStyle: 'Helvetica', //Default Arial
                               sidePadding: 65 //Default 20 (as a percentage)
                           }
                        },
                        legend: {
        					position:'bottom',
                            labels: {
                                usePointStyle: true
                            }
    					},
						responsive: true,
                    }
                });
            }else{
                component.set("v.NoData",true);
            }
                
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message on createReport: " +
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        
        $A.enqueueAction(action);
		
	}
})