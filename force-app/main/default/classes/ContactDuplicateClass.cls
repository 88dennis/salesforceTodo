public class ContactDuplicateClass {
   
    
    static String first;
    // static Boolean showModal;

   
    public static void alertDuplicate(Id conId, String firstName){
        System.debug('FROM CLASS: ' + conId + ' ' + firstName);
    }
    
    @AuraEnabled
    public static String getfNameAura(String fname){
    	first = fname;
        return first;
    }
    

    @AuraEnabled(Cacheable = true)
    public static Boolean isModal(Boolean bool){
        // bool = true;
    	// showModal = bool;
        return bool;
    }

    @AuraEnabled
    public static Contact insertContact(String firstName, String lastName, String email){
        
        
        getfNameAura(firstName);
        System.debug(first);
        
        
        try {
            Contact con = new Contact(
                FirstName = firstName,
                LastName = lastName,
                Email = email
            );
            // System.debug(task);
            insert con;
            return con;

        } catch(Exception e){

            System.debug(e);
        }
        return null;
    }

}