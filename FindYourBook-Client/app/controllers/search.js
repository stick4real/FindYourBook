$.search_button.addEventListener('click', function (e){
	data = $.searchData.value;
	var url = "https://www.googleapis.com/books/v1/volumes?q="+data;
 	var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
    	onload : function(e) {
        	var data = JSON.parse(this.responseText);
        	data.items.forEach(function(row){
        		console.log(row.volumeInfo.title);
        	});
     	},
     	// function called when an error occurs, including a timeout
     	onerror : function(e) {
         	Ti.API.debug(e.error);
         	alert('error');
     	},
     	timeout : 5000  // in milliseconds
 	});

 	// Prepare the connection.
 	client.open("GET", url);
 	// Send the request.
 	client.send();

})