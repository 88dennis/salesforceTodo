public class TaskCreatorClass {
	@InvocableMethod
    public static void ProcessEvents(List<Event> events){
        system.debug(events);
         Task t = new Task ( 
            				//the whatId will come from the process builder when you update your event relatedTo ID to the event AccountID
            				//related event ID is a custom field to store the eventID; acts as a foreign key
            				WhatId = events.get(0).whatId, //Account
                          	WhoId=events.get(0).WhoId, //Name ID label is Name
                           	Subject='Pre-Appointment Call',
                           	Related_Event_ID__C = events.get(0).Id
                          );
       //create a variable to store the validated DateTime
        //use the DateTimeHandlerClass to validate the date and time to be inserted
     system.debug(t);
        
 	DateTime dt = DateAndTimeHandlerClass.validateTimeDateDaysBefore(events.get(0).StartDateTime, 1);
        
        //add the validated dateTime
        t.ActivityDate = date.newInstance(dt.year(), dt.month(), dt.day());
              system.debug(events);
        system.debug(t);
        system.debug(dt);
        //insert the task
        insert t;
        
       // Event eventToUpdate = [SELECT id, StartDateTime FROM Event WHERE id =: events.get(0).id];
       // system.debug(eventToUpdate);
       // eventToUpdate.StartDateTime = dt;
       // update eventToUpdate;        
     
       
    }
}