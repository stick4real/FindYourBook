router = require("express").Router();
isConnected = require('../middlewares/isConnected');

module.exports = function(){
	book = require('./book');

  	// router.get("/", book.getBooks);
  	router.post("/sell", isConnected, book.sell);
  	// router.post("/", user.postUsers);

  	return router;
}();