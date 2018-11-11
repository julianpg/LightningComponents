@isTest
public class LIG_IndustryCategoryControllerTest {
    
    @isTest
    public static void VDTuserTest(){
        
        boolean vdtUser = LIG_IndustryCategoryMappingController.VDTuser();               
        
    }

    @isTest
    public static void subCategoriesTest(){
        
        List<Industry_Category_Mapping__c> cm = testData.initIndustryCategoryMapping();
        insert cm;
        
        Map<string,List<String>> categories = LIG_IndustryCategoryMappingController.subCategories();
        
        system.assert(categories.size() == 1);
        
    }
    
    @isTest
    public static void minorCategoriesTest(){
        
        List<Industry_Category_Mapping__c> cm = testData.initIndustryCategoryMapping();
        insert cm;
        
        Map<string,List<String>> minorCategories = LIG_IndustryCategoryMappingController.minorCategories();
        
        system.assert(minorCategories.size() == 2);
        
    }
}