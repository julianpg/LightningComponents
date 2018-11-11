public class LIG_RelationshipDeactivateController {

    @AuraEnabled
    public static string deactivateRelationshipContacts(id rId){
        
        string result = 'No Child Records';
        List<Relationship_Contact__c>rc = new List<Relationship_Contact__c>();
        
        for(Relationship_Contact__c r :[SELECT id,Active__c FROM Relationship_Contact__c WHERE Relationship__c =:rId]){
            
            r.Active__c = false;
            rc.add(r);         
        }

        if(!rc.isEmpty()){
            List<Database.SaveResult> srList = Database.update(rc);
            
            if(srList[0].isSuccess()){
               
                return 'Success';
                
            }else{
                
                result = 'Error:'+ string.valueOf(srList[0].getErrors()[0].getStatusCode())+': '+string.valueOf(srList[0].getErrors()[0].getMessage());
            }
        }
        
        return result;
    }
}