var args = arguments[0] || {};

$.start_sell_button.addEventListener('click', function (e){

	var tokenModel = Alloy.Globals.Token;
	var token = tokenModel.get('token');

	var data = {};
	data.googleId = args.id;
	data.title = args.title;
	data.description = args.description;
	data.author = args.author;
	data.price = $.price.value;
	data.state = $.state.value;
	data.img = args.img;

	var url = "http://10.0.3.2:3000/api/books/sell";
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

	client.setRequestHeader('token', token);

	// Send the request.
	client.send(data);
});