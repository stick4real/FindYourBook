var args = arguments[0] || {};
$.bookTitle.text = args.title;
$.bookAuthor.text = args.author;
$.imageBook.image = args.img;

$.rowBook.addEventListener('click', function (e){
    var url = "https://www.googleapis.com/books/v1/volumes/"+args.id;
    var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
        onload : function(e) {

            var data = JSON.parse(this.responseText);
            var id = data.id;
            var title = data.volumeInfo.title;
            var author = data.volumeInfo.authors != undefined ? data.volumeInfo.authors[0] : "";
            var description = data.volumeInfo.description != undefined ? data.volumeInfo.description : "";
            var img = data.volumeInfo.imageLinks != undefined ? data.volumeInfo.imageLinks.thumbnail : "";

            Alloy.createController('Book/book', { id: id, title: title, author: author, img: img, description: description}).getView().open();

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