var args = arguments[0] || {};
$.bookSeller.text = args.seller;
$.bookPrice.text = args.price + " euros";
$.bookState.text = args.state;

$.rowBook.addEventListener('click', function (e){
    Alloy.createController('Chat/chat').getView().open();
});
