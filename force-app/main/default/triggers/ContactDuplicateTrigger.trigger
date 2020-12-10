trigger ContactDuplicateTrigger on Contact (before insert, before update) {
    if(trigger.isBefore && trigger.isInsert) {
        Set <String> emailIdSet = new Set <String> ();
        Set <String> firstNameSet = new Set <String> ();
        Set <String> lastNameSet = new Set <String> ();
        Set <String> accountIdSet = new Set <String> ();

        for( Contact con : Trigger.new) {
            emailIdSet.add(con.Email);
            System.debug(con.AccountId);
            firstNameSet.add(con.FirstName);
            lastNameSet.add(con.LastName);
            accountIdSet.add(con.AccountId);
        }
        List<Contact> listCon = [SELECT Id,
                                Name, 
                                FirstName, 
                                LastName, 
                                Email, 
                                AccountId 
                                FROM 
                                Contact 
                                WHERE 
                                Email IN :emailIdSet 
                                AND 
                                FirstName IN :firstNameSet 
                                AND 
                                LastName in :lastNameSet 
                                AND 
                                AccountId in :accountIdSet];

        System.debug(listCon);
        Set <String> existingEmail = new set<string> ();
        Set <String> existingFirstName = new set<string> ();
        Set <String> existingLastName = new set<string> ();
        Set <String> existingId = new set<string> ();
        Set <String> existingAcctId = new set<string> ();

        for( Contact con: listCon) {
            existingEmail.add(con.Email);
            existingFirstName.add(con.FirstName);
            existingLastName.add(con.LastName);
            existingId.add(con.Id);
            existingAcctId.add(con.AccountId);
        }
        
        for( Contact con: Trigger.new){
            system.debug('CHECK EMAIL');
            system.debug(con.Email);
            if(con.Email <> null && con.FirstName <> null  && con.LastName <> null && con.AccountId <> null ){
                if(existingEmail.Contains(con.Email) && existingFirstName.Contains(con.FirstName) && existingLastName.Contains(con.LastName) && existingAcctId.Contains(con.AccountId)) {
                    con.isModal__c = true;
                }
            }
        }
    } 
}