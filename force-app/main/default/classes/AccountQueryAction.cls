public class AccountQueryAction {
 //RDI means Register_Duplicate_Identifier__c
   @InvocableMethod
   public static list<List<String>> getSomeList(list<List<String>> ids){ 
       system.debug(ids);
       List <String> newList = new List<String>();
       for (List<String> ls : ids) { // iteration on the x list
   			for (String s : ls) {    // iteration on each intern list
      		System.debug(s);
                newList.add(s);
			} 
       }
       
       list<List<String>> rdi = new list<List<String>>();
       rdi.add(newList);
       return rdi;
   }
}