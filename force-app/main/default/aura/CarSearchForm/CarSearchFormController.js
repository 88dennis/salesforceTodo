({
    
    doinit : function(component, event, helper) {
    		//will be fetching cartype from the backend
        var createCarRecord = $A.get("e.force:createRecord");
        
        if(createCarRecord){
            component.set("v.showNew", true);
        } else {
            component.set("v.showNew", false);
        }
    		//component.set("v.carTypes", ["Sports car", "luxury car", "van", "electric", "compact"]);
        console.log("init")
        //CALL THE HELPER METHOD THAT FETHCES THE CAR TYPES
        helper.getCarType(component, helper);
	},
    
	onSearchClick : function(component, event, helper) {
		helper.helperMethod(component, event, helper);
	},
    
    newValueSelected : function(component, event, helper) {
            var carTypeValue = component.find("carTypeList").get("v.value");
       		 console.log(carTypeValue);
	},
    
    createRecord : function(component, event, helper) {
        
        //get the Aura Event createRecord
        //https://developer.salesforce.com/docs/component-library/bundle/force:createRecord/documentation
        //this let you access the record page of your object
        var createCarRecord = $A.get("e.force:createRecord");
        console.log(createCarRecord);
     	//The code to popup the modal
        createCarRecord.setParams({
            "entityApiName" : "Car__c"
        });
        
        createCarRecord.fire();
	}
     /* handleRender : function(component, event, helper) {
    		alert("component rendered");
	},
    */
    
      /*
    toggleButton : function(component, event, helper) {
        var currentValue = component.get("v.isNewAvailable");
        console.log(currentValue);
        //component.set("v.isNewAvailable", "true");
        
        if(currentValue === true) {
            component.set("v.isNewAvailable", false);
            
            console.log(currentValue)
        } else if (currentValue === false) {
            component.set("v.isNewAvailable", true);
            
            console.log(currentValue)
        }
        
    },*/
})