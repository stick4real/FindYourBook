var args = arguments[0] || {};
$.book_label.text = args.title;
$.author_label.text = args.author;
$.imageBook.image = args.img;
$.description_label.html = args.description;

$.buy_button.addEventListener('click', function (e){
	Alloy.createController('buyBook', {id: args.id}).getView().open();
});

$.sell_button.addEventListener('click', function (e){
	$.sell_button.removeEventListener('click', arguments.callee);
	$.scrollBook.add(Alloy.createController('sellBook', {id: args.id, title: args.title, author: args.author, img: args.img, description: args.description}).getView());
});