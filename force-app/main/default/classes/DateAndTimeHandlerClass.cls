public class DateAndTimeHandlerClass {
    public static DateTime validateTimeDateDaysBefore(DateTime dt, Integer days){
        System.debug(dt);
        // Get the default business hours
        BusinessHours bh = [SELECT Id FROM BusinessHours WHERE IsDefault=true];
        System.debug('business hours query');
         System.debug(bh);
        // Create Datetime on May 28, 2013 at 1:06:08 AM in the local timezone.
        Datetime targetTime = Datetime.newInstance(dt.year(), dt.month(), dt.day() - days, dt.hour(), dt.minute(), dt.second());
        system.debug('target time!!!!');
         system.debug(targetTime);
        // Find whether the time is within the default business hours
        Boolean isWithin= BusinessHours.isWithin(bh.id, targetTime);
        system.debug(isWithin);
        
        //check if your targetTime is within business hours, if not set the target time by decrementing it by a day
       // while(!isWithin){
         //   targetTime = Datetime.newInstance(targetTime.year(), targetTime.month(), targetTime.day() - 1, targetTime.hour(), targetTime.minute(), targetTime.second());
			//isWithin= BusinessHours.isWithin(bh.id, targetTime);
       // }
       // 
         while(!isWithin){
            targetTime = Datetime.newInstance(targetTime.year(), targetTime.month(), targetTime.day() - 1, 8, 0, 0);
			isWithin= BusinessHours.isWithin(bh.id, targetTime);
        }
		return targetTime;
    }
    
}