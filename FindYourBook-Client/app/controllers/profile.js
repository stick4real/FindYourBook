var TokenCollection = Alloy.Collections.instance('token');
TokenCollection.fetch();
var TokenModel = TokenCollection.at(0);
var token = TokenModel.get("token");

var url = "http://10.0.3.2:3000/api/users";
var client = Ti.Network.createHTTPClient({
	// function called when the response data is available
	onload : function(e) {
		var tableData = [];
	    var data = JSON.parse(this.responseText);

	    $.username_label.setText(data.username);

	    // if (data._books.length != 0) {
	    // 	data._books.forEach(function(element){
	    //         var title = element.volumeInfo.title;
	    //         var id = element.id;

	    //         var author = element.volumeInfo.authors != undefined ? element.volumeInfo.authors[0] : "";
	    //         var img = element.volumeInfo.imageLinks != undefined ? element.volumeInfo.imageLinks.smallThumbnail : "";
	            
	    //         var row = Alloy.createController('rowSearch', {id: id, title: title, author: author, img: img}).getView();
	    //         tableData.push(row);
	    //     });
	    //     $.tableProfile.setData(tableData);
	    // };
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

client.setRequestHeader('token', token);

// Send the request.
client.send();