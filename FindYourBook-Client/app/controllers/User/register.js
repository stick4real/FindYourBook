$.register_button.addEventListener('click', function (e){
	data = {};
	data.username = $.username.value;
	data.password = $.password.value;
	var url = "http://10.0.3.2:3000/api/users";
 	var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
    	onload : function(e) {
            var dataError = [];
            var data = JSON.parse(this.responseText);
            if (data.error != undefined) {
                data.error.forEach(function(element){
                    var rowError = Alloy.createController('Error/Row/rowError', {error: element}).getView();
                    dataError.push(rowError);
                });
                $.tableError.setData(dataError);
            } else {
                Alloy.createController('User/login').getView().open();
            }
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
 	client.send(data);

})

$.login_button.addEventListener('click', function (e){
    Alloy.createController('User/login').getView().open();
})
