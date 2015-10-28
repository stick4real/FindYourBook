var args = arguments[0] || {};

var tokenModel = Alloy.Globals.Token;
var token = tokenModel.get('token');

var url = "http://10.0.3.2:3000/api/books/"+args.id;
var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
    onload : function(e) {
        var tableData = [];
        var data = JSON.parse(this.responseText);
        $.imageBook.image = data[0].img;
        $.bookTitle.text = data[0].title;
        $.bookAuthor.text = data[0].author;
        data.forEach(function(element){
            var seller = element._userId.username;
            var state = element.state;
            var price = element.price;
            var rowBook = Alloy.createController('Book/Row/rowBook', {seller: seller, state: state, price: price}).getView();
            tableData.push(rowBook);
        });
        $.tableBook.setData(tableData);

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