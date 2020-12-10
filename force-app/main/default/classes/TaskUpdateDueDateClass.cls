public class TaskUpdateDueDateClass {
  @InvocableMethod
	 public static void ChangeTaskDueDate(List<Event> events){
         system.debug(events);
         
         Task taskDueDateToUpdate = [Select Id, ActivityDate FROM Task WHERE Related_Event_ID__c =: events.get(0).Id];
         
         system.debug(taskDueDateToUpdate);
         system.debug(events.get(0).Related_Event_ID__c);
         
         
        DateTime dt = DateAndTimeHandlerClass.validateTimeDateDaysBefore(events.get(0).StartDateTime, 1);
         
         //add the validated dateTime
         taskDueDateToUpdate.ActivityDate = date.newInstance(dt.year(), dt.month(), dt.day());
         
         update taskDueDateToUpdate;
    }
}