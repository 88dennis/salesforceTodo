public with sharing class CarTypeSearch {
    
    @AuraEnabled
    public static List<Car_Type__c> getCarTypes(){
        
        system.debug('Server Side Controller');
        
        return [SELECT Id, Name FROM Car_Type__c];
    }
}