({
	helperMethod : function(component, event, helper) {
		alert("Search Button Works");
        console.log(event);
	},
    
    getCarType : function(component, helper){
        console.log("getCarType Function From Helper");
        //Below line of code does not make use of inheritance and can be run without extending base component
        //'v' - view or value provider
        //'c' - in component markup - client side controller
        //'c' - in client side controller/helper - Server Side Apex Controller
        
        //this line calls the method from your Server Side Apex Class and saving it in a variable
        //STEP 1 : get the method from Apex Controller you used in your component; You binded that class into your component
        // var action = component.get("c.getCarTypes");
        //  console.log(action);
        
        // //STEP 2 : use the setCallback to get the response
        // action.setCallback(this, function(response) {
        //     var state = response.getState();
        //     if(state === "SUCCESS") {
        //         component.set("v.carTypes", response.getReturnValue());
        //     } else if(state === "ERROR") {
        //         console.log("error")
        //     }
        //     console.log(state);
        //     //STEP 3 : use the response in your component.set to display the data in the ui
        // })
        // //STEP 4 : dont forget this
        // $A.enqueueAction(action);


        //INSTEAD OF PUTTING THE FETCH CODE HERE YOU PUT IT IN THE BASE COMPONENT
        //IN YOUR CARSEARCH COMP YOU PUT THE EXTENDS KEYWORD AND THE NAME OF YOUR BASE COMP
        //CALL THE BASE COMPONENT HELPER METHOD HERE

        helper.callServer(component, "c.getCarTypes", function(response){
            component.set("v.carTypes", response);
        })
    }
    
})