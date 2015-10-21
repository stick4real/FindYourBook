$.register_button.addEventListener('click', function (e){
    Alloy.createController('register').getView().open();
})

$.login_button.addEventListener('click', function (e){
	data = {};
	data.username = $.username.value;
	data.password = $.password.value;
	var url = "http://10.0.3.2:3000/api/login";
 	var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
    	onload : function(e) {
            var TokenCollection = Alloy.createCollection('token');
            TokenCollection.fetch();
            if (TokenCollection.length != 0) {
                var data = JSON.parse(this.responseText);
                var TokenModel = TokenCollection.at(0);
                TokenModel.save({token: data.token});
                Alloy.createController('home').getView().open();
            }else {
                var data = JSON.parse(this.responseText);
                var token = Alloy.createModel('token', {token: data.token});
                token.save();
                var TokenCollection = Alloy.createCollection('token');
                TokenCollection.fetch();
                Alloy.createController('home').getView().open();
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