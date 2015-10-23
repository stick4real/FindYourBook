var args = arguments[0] || {};
$.book_label.text = args.title;
$.author_label.text = args.author;
$.imageBook.image = args.img;
$.description_label.html = args.description;

$.buy_button.addEventListener('click', function (e){
	// TODO
	// Call api for buy book function
});

$.sell_button.addEventListener('click', function (e){
	// TODO
	// Call api for sell book function
});