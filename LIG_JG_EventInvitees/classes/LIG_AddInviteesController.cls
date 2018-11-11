public class LIG_AddInviteesController {
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchKeyWord, String ObjectName) {
        system.debug('ObjectName-->' + ObjectName);
        String searchKey = searchKeyWord + '%';
        
        List < sObject > returnList = new List < sObject > ();
      
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5   
        String sQuery =  'select id, Name from ' +ObjectName + ' where isActive = true AND Name LIKE: searchKey order by createdDate DESC limit 5';
        List < sObject > lstOfRecords = Database.query(sQuery);
        
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }
    @AuraEnabled
    public static List<User>Invitees(id eventId){
        
        id eId = eventId;
        system.debug('eventId::'+eId);
        Event e = [SELECT isChild,WhatId,Subject,StartDateTime FROM Event WHERE id =:eventId LIMIT 1];        
        set<id>userIds = new set<id>();
        List<EventRelation>eRelations = new List<EventRelation>();
        //check if the event is a child
        if(e.isChild){           
            eId = [SELECT id FROM Event WHERE WhatId =:e.WhatId AND Subject =:e.Subject AND StartDateTime = :e.StartDateTime AND isChild = false].id;
        }        
        eRelations = [SELECT id,RelationId FROM EventRelation WHERE EventId =:eId AND isInvitee = true ];
        for(EventRelation er : eRelations){
            
            userIds.add(er.RelationId);
        }
        List<User>Users = [SELECT id,Name FROM user WHERE id IN:userIds ORDER BY FirstName ASC];
        system.debug('EventInvitees::'+Users);
        return Users;
        
    }
    @AuraEnabled
    public static event parentEvent(id eventId){
        
        system.debug('eventId::'+eventId);
        Event e = [SELECT isChild,WhatId,Subject,StartDateTime FROM Event WHERE id =:eventId LIMIT 1];        
        if(e.isChild){           
            event eId = [SELECT id,Owner.Name FROM Event WHERE WhatId =:e.WhatId AND Subject =:e.Subject AND StartDateTime = :e.StartDateTime AND isChild = false];
            return eId;
        }       
        return null;
        
    }
    @AuraEnabled
    public static string createEventAttendees(EventRelation Attendee){
        
        string result;
        system.debug('attendees::'+Attendee);
        //send update to invitees
        //Database.DMLOptions dmo = new Database.DMLOptions(); 
        //dmo.EmailHeader.triggerUserEmail = true; 
        
       Database.SaveResult srList = Database.insert(Attendee);
        
       
            if (srList.isSuccess()) {
                // Operation was successful, so get the ID of the record that was processed
                result = srList.getId();
            }
            else {
                // Operation failed, so get all errors               
                result = 'Error:'+ string.valueOf(srList.getErrors()[0].getStatusCode())+': '+string.valueOf(srList.getErrors()[0].getMessage());
            }  
	
      return result;
    }
    
    @AuraEnabled
    public static string deleteInvitee(string eId,string uId){
        system.debug('eId'+eId+'uId'+uId);        
        try{
            EventRelation er = [SELECT id FROM EventRelation WHERE EventId =:eId AND RelationId =:uId];
        	delete er;
            return 'Deleted';
        }catch(Exception e){
            system.debug('Catch::'+e);
            return e.getMessage();
        }
        
    }
}