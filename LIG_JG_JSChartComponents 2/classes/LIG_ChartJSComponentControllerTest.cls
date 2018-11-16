@isTest
public class LIG_ChartJSComponentControllerTest {

    @isTest
    public static void openOpportunities_Test(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
                       
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account();
        a.name='Test Account';
        
        insert a;
        
        LIG_ChartJSController.openOpportunities(a.id);
    }
    
    @isTest
    public static void closedWonOpportunities_Test(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
         
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account();
        a.name='Test Account';
        
        insert a;
        
        LIG_ChartJSController.closedWonOpportunities(a.Id);
    }
    
    @isTest
    public static void ClosedWonProductRevenue_Test(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
                    
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account();
        a.name='Test Account';
        
        insert a;
        
        LIG_ChartJSController.ClosedWonProductRevenue(a.Id);
    }
    
    @isTest
    public static void ClosedLostAnalysis_Test(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
                          
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account();
        a.name='Test Account';
        
        insert a;
                
        LIG_ChartJSController.ClosedLostAnalysis(a.Id);
    }
    
    @isTest(seeAllData='true')//using to get codecoverage on 1 line, can be removed as coverage is at 90% without it
    public static void getReport_Test(){
        
        LIG_ChartJSController.getReport('SampleReportCompletedActivities');
        
    }
}