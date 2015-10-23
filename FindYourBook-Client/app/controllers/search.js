$.search_button.addEventListener('click', function (e){
    searchData = $.searchData.value;
    var url = "https://www.googleapis.com/books/v1/volumes?q="+searchData;
    var client = Ti.Network.createHTTPClient({
    // function called when the response data is available
        onload : function(e) {

            var tableData = [];

            var data = JSON.parse(this.responseText);
            data.items.forEach(function(element){
                var title = element.volumeInfo.title;
                var id = element.id;

                var author = element.volumeInfo.authors != undefined ? element.volumeInfo.authors[0] : "";
                var img = element.volumeInfo.imageLinks != undefined ? element.volumeInfo.imageLinks.smallThumbnail : "";
                
                var row = Alloy.createController('row', {id: id, title: title, author: author, img: img}).getView();
                tableData.push(row);
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
    // Send the request.
    client.send();

})