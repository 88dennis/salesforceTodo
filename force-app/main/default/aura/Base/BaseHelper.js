({
	helperMethod : function() {
		console.log("hello")
	},

	callServer : function(component, method, callback, params){
		var action = component.get(method);

		if(params){
			action.setParams(params);
		}

		action.setCallback(this,function(response){
			var state = response.getState();
			if(state === "SUCCESS"){
				callback.call(this,response.getReturnValue());


			} else if (state === "ERROR"){
				var errors = response.getError();
				if(errors) {
					console.log("ERRORS ", errors);
					if(errors[0] && errors[0].message) {
						throw new Error("Error" + errors[0].message);
					}
				} else {
					throw new Error("Unknown Error");
				}
			}
		});
		$A.enqueueAction(action);
	}
})