public class UpdateEventViaTaskClass {
	@InvocableMethod(label='Update Event Status')
    public static void updateEventStatus(list<Id> eventId ) {
         Event eventToUpdate = [SELECT Event_Status__c 
                                FROM Event 
                                WHERE id =:eventId.get(0) 
                                Limit 1];
        eventToUpdate.Event_Status__c = 'Cancelled';
        update eventToUpdate;
        system.debug(eventToUpdate.Event_Status__c);
    }
}