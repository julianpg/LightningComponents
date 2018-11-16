public with sharing class LIG_ChartJSController {

    @AuraEnabled
    public static List<AggregateResult>openOpportunities(id accId){
        //Add the date range once data tested
        List<String> lst = new List<String>();
        lst.add('Brief');
        lst.add('Discussion');
        lst.add('Preparation');
        lst.add('Final Negotiations');
        return [SELECT Owner.Name,SUM(Amount) FROM Opportunity WHERE Agency__c=:accid AND stageName IN:lst AND createdDate >= LAST_FISCAL_YEAR GROUP BY Owner.Name];
    }
   	
    @AuraEnabled
    public static List<AggregateResult>closedWonOpportunities(id accId){
        

        return [SELECT calendar_year(User_Actual_Close_Date__c) year,calendar_month(User_Actual_Close_Date__c) month, SUM(Amount) FROM Opportunity WHERE Agency__c=:accid AND isWon = true AND User_Actual_Close_Date__c >= LAST_FISCAL_YEAR GROUP BY calendar_year(User_Actual_Close_Date__c),calendar_month(User_Actual_Close_Date__c) ORDER BY calendar_month(User_Actual_Close_Date__c) ASC];
        
    }
  
    @AuraEnabled
    public static List<AggregateResult>ClosedWonProductRevenue(id accId){
        
        //Opportunities with products - grouped by product name and summarise sales price
        return [SELECT PricebookEntry.Name, SUM(TotalPrice) FROM OpportunityLineItem WHERE Opportunity.Agency__c=:accid AND Opportunity.isWon = true AND Opportunity.User_Actual_Close_Date__c >= LAST_FISCAL_YEAR GROUP BY PricebookEntry.Name];
        
    }
    
    @AuraEnabled
    public static List<AggregateResult>ClosedLostAnalysis(id accId){
        
        return [SELECT Loss_Reason__c, COUNT(id) FROM Opportunity WHERE Agency__c=:accid AND StageName = 'Closed Lost' AND User_Actual_Close_Date__c >= LAST_FISCAL_YEAR AND Loss_Reason__c != 'Entered in Error' GROUP BY Loss_Reason__c];
        
    }
    
    @AuraEnabled
    public static id getReport(string name){
        
        id reportId = [SELECT id FROM report WHERE developername = :name LIMIT 1].id;
        system.debug('reportID'+reportId);
        return reportId;
        
    }
}