@isTest
public class LIGAddEventInviteesTest {
        
  	@isTest
    public static void fetchLookUpValuesTest(){
        
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(
                Alias = 'standt', 
                Email='standarduser@testorg.com', 
                EmailEncodingKey='UTF-8',
                FirstName='Invitee',
                LastName='Testing', 
                LanguageLocaleKey='en_US', 
                LocaleSidKey='en_US', 
                ProfileId = p.Id, 
                TimeZoneSidKey='America/Los_Angeles', 
                UserName='standarduser@testorgDMG.com');
                    
        insert u;
        
        List<sObject>users = LIG_AddInviteesController.fetchLookUpValues('Invitee Test', 'User');
        
        user us = (user)users[0];
        
        system.assert(us.Name == 'Invitee Testing');
    
	}
    
    @isTest
    public static void InviteesTest(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
        
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(
                Alias = 'standt', 
                Email='standarduser@testorg.com', 
                EmailEncodingKey='UTF-8',
                FirstName='Invitee',
                LastName='Testing', 
                LanguageLocaleKey='en_US', 
                LocaleSidKey='en_US', 
                ProfileId = p.Id, 
                TimeZoneSidKey='America/Los_Angeles', 
                UserName='standarduser@testorgDMG.com');
                    
        insert u;
        
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account();
        a.name='Test Account';
        
        insert a;
        
        contact c = new Contact();
        c.LastName = 'Test';
        c.Email = 'Email@Test.com';
        
        insert c;
        
        Event e = new Event();
        e.WhatId=a.id;
        e.WhoId =c.id;
        e.StartDateTime=system.today();
        e.EndDateTime=system.today()+5;
        
		insert  e;
        
        EventRelation er = new EventRelation();
        er.EventId = e.id;
        er.RelationId = u.id;
        er.IsInvitee = true;
		
        insert er;
        
        List<user>users = LIG_AddInviteesController.Invitees(e.id);
        
        system.assertEquals(u.id, users[0].id);

    }
    
    @isTest
    public static void createEventAttendeesTest(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
        
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(
                Alias = 'standt', 
                Email='standarduser@testorg.com', 
                EmailEncodingKey='UTF-8',
                FirstName='Invitee',
                LastName='Testing', 
                LanguageLocaleKey='en_US', 
                LocaleSidKey='en_US', 
                ProfileId = p.Id, 
                TimeZoneSidKey='America/Los_Angeles', 
                UserName='standarduser@testorgDMG.com');
                    
        insert u;
        
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account ();
        a.name='Test Account';
        
        insert a;
        
        contact c = new Contact();
        c.LastName = 'Test';
        c.Email = 'Email@Test.com';
        
        insert c;
        
        Event e = new Event();
        e.WhatId=a.id;
        e.WhoId =c.id;
        e.StartDateTime=system.today();
        e.EndDateTime=system.today()+5;
        
		insert  e;
        
        EventRelation er = new EventRelation();
        er.EventId = e.id;
        er.RelationId = u.id;
        er.IsInvitee = true;
		
       	string result = LIG_AddInviteesController.createEventAttendees(er);
        
        EventRelation EventR = [SELECT id FROM EventRelation WHERE EventId = :e.id AND RelationId = :u.id LIMIT 1];
        
        system.assert(EventR.id == result);
        
    }
    
    @isTest
    public static void deleteInviteeTest(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;    
        
        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User']; 
        User u = new User(
                Alias = 'standt', 
                Email='standarduser@testorg.com', 
                EmailEncodingKey='UTF-8',
                FirstName='Invitee',
                LastName='Testing', 
                LanguageLocaleKey='en_US', 
                LocaleSidKey='en_US', 
                ProfileId = p.Id, 
                TimeZoneSidKey='America/Los_Angeles', 
                UserName='standarduser@testorgDMG.com');
                    
        insert u;
                
        IntegrationSettings__c is = testData.buildIntegrationSettings();
        insert is;
        
        Account a= new Account ();
        a.name='Test Account';
        
        insert a;
        
        contact c = new Contact();
        c.LastName = 'Test';
        c.Email = 'Email@Test.com';
        
        insert c;
        
        Event e = new Event();
        e.WhatId=a.id;
        e.WhoId =c.id;
        e.StartDateTime=system.today();
        e.EndDateTime=system.today()+5;
        
		insert  e;
        
        EventRelation er = new EventRelation();
        er.EventId = e.id;
        er.RelationId = u.id;
        er.IsInvitee = true;
		
        insert er;
        
        string result = LIG_AddInviteesController.deleteInvitee(e.Id, u.Id);
        event eventChild = LIG_AddInviteesController.parentEvent(e.id);   
        
        system.assert(result=='Deleted');
        
    }
    
}