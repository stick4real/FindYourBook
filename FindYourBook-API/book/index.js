router = require("express").Router();
isConnected = require('../middlewares/isConnected');

module.exports = function(){
	book = require('./book');

  	router.get("/:idBook", isConnected, book.getBooks);
  	router.post("/sell", isConnected, book.sell);

  	return router;
}();