public class RandomizerForFlowClassString {
 //RDI means Register_Duplicate_Identifier__c
   @InvocableMethod
   public static List<String> getTheListFromFlow(list<List<String>> listOfListItems){ 
       system.debug(listOfListItems);
       
		//create a set variable to store the items you'll get from the loop
       Set <String> setCollection = new Set<String>();
       
       //loop thru the listOflistItems and add it to the setCollection doing a nested loop
       for (List<String> ls : listOfListItems) { // iteration on the x list
   			for (String s : ls) {    // iteration on each intern list
      		System.debug(s);
                setCollection.add(s);
			} 
       }
       
// Convert the Set to a list
List<String> lstCollection = new List<String>();
lstCollection.addAll(setCollection);
//Generate a random list index
Double randomNumber = Math.random();
Integer arrayLength = lstCollection.size();
Integer randomIndex = (randomNumber *(arrayLength-1)).intValue();
system.debug('random index is : ');
 system.debug(randomIndex);
       
//Output the element at the list index generated above
System.debug('Random element: '+lstCollection[randomIndex]);
       
       List<String> newList = new List<String>();
       newList.add(lstCollection[randomIndex]);
       system.debug(newList);
       
       list<List<String>> newListOfList = new list<List<String>>();
       newListOfList.add(newList);
       
       system.debug(newListOfList);
       return newList;
   }
}


/*
 CREATE A LIST OF LIST SAMPLE
FOR TESTING IN ANONYMOUS WINDOW
List<List<String>> listOfLists = new List<List<String>>();
		List<String> list1 = new List<String>();
		list1.add('dennis');
		list1.add('cari');
		list1.add('gen');
		list1.add('mike');
		listOfLists.add(list1);
            system.debug(listofLists);

*/