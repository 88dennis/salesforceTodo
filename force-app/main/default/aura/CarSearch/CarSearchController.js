({
	doFormSubmit : function(component, event, helper) {
		var carTypeId = event.getParams('carTypeId');
          console.log('HELLOOOO');
        console.log(JSON.stringify(carTypeId));
        
         console.log("CAR TYPE IS " + carTypeId.carTypeId);
	}
})