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
                                backgroundColor:'rgb(22,50,92)',
                                displayColors: false,
                                titleMarginBottom :10,
                                callbacks: {
                                    title: function (tooltipItem, data) { 
                                        return data.labels[tooltipItem[0].index]; 
                                    },
                                    label: function(tooltipItem, data) { 
                                        var amount =  data['datasets'][0]['data'][tooltipItem['index']];
                                        var value = amount.toString();
                                        var currencyAmount = '';
                                        if(value.length<=6){
                                                var roundedValue = Math.round(value/1000)*1000
                                                currencyAmount = '£' + roundedValue/1e3+'K';
                                            }else if(value.length > 6 < 10){
                                                var roundedValue = Math.round(value/100000)*100000
                                                currencyAmount = '£' + roundedValue/1e6+'M';
                                            }else{
                                                currencyAmount = '£' + value/1e9+'B';
                                            }
                                        
                                        return 'Sum of Amount  '+currencyAmount;
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
                                case 5:
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
                              	backgroundColor:'rgb(22,50,92)',
                                displayColors: false,
                                titleMarginBottom :10,
                                callbacks: {
                                    title: function (tooltipItem, data) { 
                                        return data.labels[tooltipItem[0].index]; 
                                    },
                                    label: function(tooltipItem, data) { 
                                        var amount =  data['datasets'][0]['data'][tooltipItem['index']];
                                        var value = amount.toString();
                                         
                                        var currencyAmount = '';
                                        if(value.length<=6){
                                            var roundedValue = Math.round(value/1000)*1000
                                                currencyAmount = '£' + roundedValue/1e3+'K';
                                            }else if(value.length > 6 < 10){
                                                var roundedValue = Math.round(value/100000)*100000
                                                currencyAmount = '£' + roundedValue/1e6+'M';
                                            }else{
                                                currencyAmount = '£' + value/1e9+'B';
                                            }
                                        
                                        return 'Sum of Amount  '+currencyAmount;
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
            var action = component.get("c.ClosedLostAnalysis");
        	var colors = this.colorArray();
        	var self = this;
        	
        	action.setParams({"accId":accId});
        	action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log("response::"+JSON.stringify(response.getReturnValue()));

                var chartData = [];
                var chartLabels = [];
                var Total = 0;
                if(resultData.length > 0){
                for(var i=0; i < (resultData.length); i++){
                    //add labels              
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
                                backgroundColor: colors
                            }
                        ]
                    },
                    options:{
                       cutoutPercentage: 65,
                       tooltips: {       
                            enabled: true,
                            mode: 'single',
                            backgroundColor:'rgb(22,50,92)',
                        	displayColors: false,
                            titleMarginBottom :10,
                            callbacks: {
                            	beforeTitle: function(tooltipItem, data) {
                                
                                return 'Close Reason';
                            	},
                                title: function (tooltipItem, data) { 
                                    return data.labels[tooltipItem[0].index]; 
                                },                              
                                label: function(tooltipItem, data) { 
                                   var dataset = data.datasets[tooltipItem.datasetIndex];
                                   var Value = dataset.data[tooltipItem.index];
                                   
                                   return 'Record Count   '+Value;
                                 },
                                afterLabel: function(tooltipItem, data) {
                                    var dataset = data.datasets[tooltipItem.datasetIndex];
                                    var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                        return previousValue + currentValue;
                                    });
                                    var currentValue = dataset.data[tooltipItem.index];
                                    var precentage = Math.floor(((currentValue/total) * 100)+0.5); 
                                    
                                 return precentage + "%";
                              }
                            }
                       },  
                       pieceLabel: {
                            render: 'value',
                            precision: 2,
                            fontSize: 14,
                           fontColor:function (data) {
                              var r = self.hexToR(data.dataset.backgroundColor[data.index]);
                              var g = self.hexToG(data.dataset.backgroundColor[data.index]);
                              var b = self.hexToB(data.dataset.backgroundColor[data.index]);
                              console.log("rgb::"+r+','+g+','+b);
                              var threshold = 140;
                              var luminance = 0.299 * r + 0.587 * g + 0.114 * b;
                              return luminance > threshold ? 'black' : 'white';
                            },
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
                            display: false,
    					},
						responsive: true,

                    }
                });
                 var ps = new PerfectScrollbar('.container');
                 component.find("js-legend").getElement().innerHTML = chart.generateLegend();
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
            var action = component.get("c.ClosedWonProductRevenue");
            var colors = this.colorArray();
        	var self = this;
        	
        	action.setParams({"accId":accId});
        	action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var resultData = response.getReturnValue();
                console.log("response::"+JSON.stringify(response.getReturnValue()));

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
                    console.log("Value K "+value);
                    var roundedValue = Math.round(value/1000)*1000
                	totalValue = '£' + roundedValue/1e3+'K';
                }else if(value.length > 6 < 10){
                    var roundedValue = Math.round(value/100000)*100000
                    totalValue = '£' + roundedValue/1e6+'M';
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
                                backgroundColor: colors 
                            }
                        ]
                    },
                    options:{
                      cutoutPercentage: 65,
                      tooltips: {       
                        enabled: true,
                        mode: 'point',
                        backgroundColor:'rgb(22,50,92)',
                        displayColors: false,
                        titleMarginBottom :10,
                        callbacks: {
                            beforeTitle: function(tooltipItem, data) {
                                
                                return 'Product Name';
                            },
                            title: function (tooltipItem, data) { 
                                return data.labels[tooltipItem[0].index]; 
                            },
                            label: function(tooltipItem, data) { 
                               var dataset = data.datasets[tooltipItem.datasetIndex];
                               var currentValue = dataset.data[tooltipItem.index];
                               var value = currentValue.toString();
                               var totalValue = '';
                                if(value.length<=6){
                                    var roundedValue = Math.round(value/1000)*1000
                                    totalValue = '£' + roundedValue/1e3+'K';
                                }else if(value.length > 6 < 10){
                                    var roundedValue = Math.round(value/100000)*100000
                                    totalValue = '£' + roundedValue/1e6+'M';
                                }else{
                                    totalValue = '£' + value/1e9+'B';
                                }
                               return 'Sum of Sales Price  '+totalValue;
                            },
                            afterLabel: function(tooltipItem, data) {
                                var dataset = data.datasets[tooltipItem.datasetIndex];
                              	var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                                	return previousValue + currentValue;
                              	});
                                var currentValue = dataset.data[tooltipItem.index];
                                var precentage = Math.floor(((currentValue/total) * 100)+0.5);         
                                return precentage + "%";
                                
                            }
                        }
                       },                        
                       pieceLabel: {
                            render: function (args) {
                                var value = args.value.toString();
                                var currencyAmount = '';
                                if(value.length<=6){
                                    
                                    var roundedValue = Math.round(value/1000)*1000
                                        currencyAmount = '£' + roundedValue/1e3+'K';
                                    }else if(value.length > 6 < 10){
                                         var roundedValue = Math.round(value/100000)*100000
                                        currencyAmount = '£' + roundedValue/1e6+'M';
                                    }else{
                                        
                                        currencyAmount = '£' + value/1e9+'B';
                                    }
                    					return currencyAmount;          
                  			},
                            
                            fontSize: 14,
    						fontStyle: 'bold',
                            fontFamily: "'Helvetica'",
                           	fontColor:function (data) {
                              var r = self.hexToR(data.dataset.backgroundColor[data.index]);
                              var g = self.hexToG(data.dataset.backgroundColor[data.index]);
                              var b = self.hexToB(data.dataset.backgroundColor[data.index]);
                              console.log("rgb::"+r+','+g+','+b);
                              var threshold = 140;
                              var luminance = 0.299 * r + 0.587 * g + 0.114 * b;
                              return luminance > threshold ? 'black' : 'white';
                            }
                       },
                       elements: {
                           center: {
                               text: totalValue,
                               color: '#060606', //Default black
                               fontStyle: 'Helvetica', //Default Arial
                               sidePadding: 65 //Default 20 (as a percentage)
                           }
                        },
                        legend:{
                          display:false
                        },
						responsive: true,
                    }
                });
                var ps = new PerfectScrollbar('.container');                
                component.find("js-legend").getElement().innerHTML = chart.generateLegend();
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
    
    colorArray: function(){
        //color array to be used in doughnut charts
         var colors = [             
             						"#104E8B",
                                    "#0276FD",
                                    "#7EB6FF",
                                    "#67C8FF",
                                    "#1C86EE",
                                    "#60AFFE",
                                    "#007FFF",
                                    "#7D9EC0",
                                    "#1C86EE",
                                    "#1E90FF",
                                    "#739AC5",
                                    "#499DF5",
                                    "#7AA9DD",
                                    "#6E7B8B",
                                    "#4372AA",
                                    "#687C97",
                                    "#4973AB",
                                    "#BCD2EE",
                                    "#4D71A3",
                                    "#88ACE0",
                                    "#3579DC",
                                    "#4D6FAC",
                                    "#6495ED",
                                  	"#0EBFE9",
                                    "#009ACD",
                                    "#7aded8",                                
                                    "#668B8B",
                                    "#2F4F4F",
                                    "#528B8B",
                                    "#388E8E",
                                    "#8FD8D8",
                                    "#70DBDB",
                                    "#8DEEEE",
                                    "#008B8B",
                                    "#00FFFF",
                                    "#BBFFFF",
                                    "#00CED1",
                                    "#00C5CD",
                                    "#67E6EC",
                                    "#53868B",
                                    "#7AC5CD",
                                    "#98F5FF",
                                    "#39B7CD",
                                    "#C3E4ED",
                                    "#9AC0CD",
                                    "#B2DFEE",
                                    "#0099CC",
                                    "#BFEFFF",
                                    "#87CEEB",
                                    "#42C0FB",
                                    "#236B8E",
                                    "#33A1DE",
                                    "#5D92B1",
                                    "#A4D3EE",
                                    "#B0E2FF",
                                    "#4A708B",
                                    "#1464F4",
                                    "#1B3F8B",
                                    "#3D59AB",
                                    "#4169E1",
                                    "#4876FF",
                                    "#162252",
                                    "#6F7285",
                                    "#7D7F94",
                                    "#42426F",
                                    "#7171C6",
                                    "#3232CC",
                                    "#E6E6FA",
                                    "#00008B",
                                    "#0000EE",
                                    "#4D4DFF",
                                    "#CCCCFF",
                                    "#120A8F",
                                    "#473C8B",
                                    "#6959CD",
                                    "#8470FF",
                                    "#5D478B",
                                    "#9370DB",
                                    "#380474",
                                    "#1da69d",
                                    "#E67E22",
                                    "#F8C471",
                                    "#3498DB",
                                    "#00BCD4",
                                    "#D32F2F",
                                    "#82E0AA",
                                    "#AFB42B"];
        
        return colors;
    },
    
    hexToR: function (hex){
        hex = hex.replace('#','');
        var r = parseInt(hex.substring(0,2), 16);
       return r;
    },
    hexToG: function (hex){
        hex = hex.replace('#','');
        var g = parseInt(hex.substring(2,4), 16);
       return g;
    },
    hexToB: function (hex){
        hex = hex.replace('#','');
        var b = parseInt(hex.substring(4,6), 16);
       return b;
    }
        
})