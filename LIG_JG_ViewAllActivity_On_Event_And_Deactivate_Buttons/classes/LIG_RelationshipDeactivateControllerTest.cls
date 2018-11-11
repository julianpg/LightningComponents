@isTest
public class LIG_RelationshipDeactivateControllerTest {
    
    @isTest
    public static void deactivateRelationshipContactsTestNoChild(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
        
        Account a= new Account();
        a.name='Test Account A';        
        insert a;
        
        Account b = new Account();
        b.name='Test Account b';        
        insert b;
        
        Relationship__c r = new Relationship__c();
        r.Account_A__c = a.id;
        r.Account_B__c = b.id;
        r.Active__c    = true;
       	insert r;
        
        string result = LIG_RelationshipDeactivateController.deactivateRelationshipContacts(r.Id);
        
        system.assert(result == 'No Child Records');
                      
    }
    
    @isTest
    public static void deactivateRelationshipContactsTest(){
        
        ConstantsH__c ch = new ConstantsH__c();
        ch.Acc_and_Contact_owner__c = 'A&N Media';
        ch.Department__c = 'IT';
        insert ch;
        
        Account a= new Account();
        a.name='Test Account A';        
        insert a;
        
        Account b = new Account();
        b.name='Test Account b';        
        insert b;
        
        Contact c = new Contact();
        c.LastName = 'Test';
        c.Email    = 'email@test.com';
        insert c;
        
        Relationship__c r = new Relationship__c();
        r.Account_A__c = a.id;
        r.Account_B__c = b.id;
        r.Active__c    = true;
       	insert r;
        
        Relationship_Contact__c rc = new Relationship_Contact__c();
        rc.Relationship__c         = r.id;
        rc.Relationship_Contact__c = c.id;
        rc.Active__c               = true;
        insert rc;
        
        string result = LIG_RelationshipDeactivateController.deactivateRelationshipContacts(r.Id);
        
        system.assert(result == 'Success');
                     
    }

}