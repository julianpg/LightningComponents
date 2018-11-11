/*************************************************************************
 * Julian Garcia														 *
 * 09/11/2018															 *	
 * Controller class for LIG_IndustryCategoryMapping lightning component  *
 * returns maps from the Industry_Category_Mapping__c object and a user  *
 * record to validate VDT												 *
 * ***********************************************************************/
public class LIG_IndustryCategoryMappingController {
	
	@AuraEnabled
    public static boolean VDTuser(){        
        Boolean oUser = [select id,Virtual_Data_Team_Member__c FROM User Where id =: userInfo.getUserId()].Virtual_Data_Team_Member__c;
        return oUser;    
    }
    
    @AuraEnabled
    public static Map<string,List<String>> subCategories(){
        Set<String> parentList = new Set<String>();
        Map<String, List<String>> parentDepMap = new Map <String, List<String>>();
        
        List<Industry_Category_Mapping__c> mappingList = [Select Name,Minor_Category__c,Industry__c from Industry_Category_Mapping__c];
         for (Industry_Category_Mapping__c i: mappingList){
            parentList.add(i.Industry__c);
         }
        
        for (String industry: parentList){
            List<String> validList =new List<String>() ;
            for (Industry_Category_Mapping__c i : mappingList){
                 if(i.Industry__c == industry){
                    validList.add(i.Name);                   
             	  }
            }
            
            parentDepMap.put(industry,validList);
        }
        return parentDepMap;      
    }
    
    @AuraEnabled
    public static Map<string,List<String>> minorCategories(){       
    	Map<String, List<String>> childDepMap = new Map<string,List<string>>();
        
        for (Industry_Category_Mapping__c i: [Select Name,Minor_Category__c,Industry__c from Industry_Category_Mapping__c]){
            String[] minors = i.Minor_Category__c.split(';');
            childDepMap.put(i.Name,minors);            
        }
        return childDepMap;
    }
}