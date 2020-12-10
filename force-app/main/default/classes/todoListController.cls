public with sharing class todoListController {

    public todoListController() {

    }

    @AuraEnabled(Cacheable = true)
    public static Boolean isBoolTrue(Boolean bool){

        bool = true;
        system.debug(bool);
        return bool;
    }

    @AuraEnabled(Cacheable = true)

    public static void helloWorld(){
        system.debug('HELLLOOASDASD');
    }

    @AuraEnabled(Cacheable = true)
    public static List <Task> getTasks(){

        // System.debug([SELECT Subject FROM Task WHERE OwnerId = :UserInfo.getUserId()]);
        return [SELECT Subject FROM Task WHERE OwnerId = :UserInfo.getUserId()];
    }

    @AuraEnabled
    public static Task insertTask(String subject){
        try {
            Task task = new Task(
                Subject = subject,
                OwnerId = UserInfo.getUserId(),
                Status = 'Not Started',
                Priority = 'Normal'
            );
            // System.debug(task);
            insert task;
            return task;

        } catch(Exception e){

            System.debug(e);
        }
        return null;
    }


    @AuraEnabled
    public static Boolean deleteTask(Id recordId){
        try {
            Database.delete(recordId);
            return true;

        } catch(Exception e){

            System.debug(e);
        }
        return false;
    }



}