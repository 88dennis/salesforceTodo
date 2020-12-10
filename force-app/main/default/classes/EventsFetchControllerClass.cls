public with sharing class EventsFetchControllerClass {
    @AuraEnabled(cacheable=true)
    public static List<Event> getEventList(String recordId) {
        System.debug(recordId);

        return [SELECT Id, WhoId, StartDateTime, EndDateTime, User_Name__c, OwnerId, Owner.Name, Owner.Phone, User_Address__c, User_Phone__c FROM Event WHERE WhoId =: recordId];
    }
}