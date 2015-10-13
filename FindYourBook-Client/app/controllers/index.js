$.login_button.addEventListener('click', function (e){
	args = {};
	args.username = $.username.value;
	args.password = $.password.value;
	var url = "http://10.0.3.2:3000/api/users";
 	var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
    	onload : function(e) {
         	Ti.API.info("Received text: " + this.responseText);
         	alert('success');
     	},
     	// function called when an error occurs, including a timeout
     	onerror : function(e) {
         	Ti.API.debug(e.error);
         	alert('error');
     	},
     	timeout : 5000  // in milliseconds
 	});

 	// Prepare the connection.
 	client.open("POST", url);
 	// Send the request.
 	client.send(args);

})

$.index.open();
