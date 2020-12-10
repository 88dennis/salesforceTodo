public with sharing class ContactDuplicateClassV2 {

    public static boolean checker =true;

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactRecordsMethod(String recordId) {

        List<Contact> contList = [
            SELECT Id, 
            FirstName,
            LastName,
            Email,
            isModal__c,
            AccountId,
            Account.Name 
            FROM 
            Contact 
            WHERE 
            Id = :recordId
            ];
        return  contList;
    }

    @AuraEnabled
    public static List<Contact> getExistingContactRecordsMethod(
        String recordId, 
        String firstName, 
        String lastName, 
        String email, 
        String accountId, 
        String accountName) {

        List<Contact> existingConList = [SELECT Id, 
                                        FirstName,
                                        LastName,
                                        Email,
                                        isModal__c,
                                        AccountId,
                                        Account.Name 
                                        FROM 
                                        Contact
                                        WHERE
                                        (FirstName = :firstName AND LastName = :lastName AND Account.Name =:accountName)
                                        AND Id != :recordId LIMIT 1];
        return  existingConList;
    }

    @AuraEnabled
    public static Boolean closeModalMethod(String recordId) {
            try {
                system.debug('RECORD ID FROM CLOSEMODAL METHOD '+ recordId);
                checker = false;

                list<Contact> contactsToUpdate = [SELECT Id, isModal__c from Contact where Id = :recordId];
                for(Contact con : contactsToUpdate)
                { 
                    con.isModal__c = false;
                    update con;
                }

                list<Contact> updatedCon = [SELECT Id, isModal__c from Contact where Id = :recordId];
                system.debug('CON FROM CLOSEMODAL METHOD '+ updatedCon);

                // if(updatedCon.isModal__c == false){
                //     checker = false;
                // }

                system.debug(checker);
                return true;
            } catch(Exception e){
                System.debug(e);
            }
            return false;
    }

    @AuraEnabled
    public static Boolean cancelMethod(String recordId) {
            try {
                Contact con = [SELECT Id, isModal__c from Contact where Id = :recordId];
                con.isModal__c = false;
                delete con;
                return false;
            } catch(Exception e){
                System.debug(e);
            }
            return true;
    }

}