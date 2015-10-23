router = require("express").Router();

module.exports = function(){
	book = require('./book');

  	// router.get("/", book.getBooks);
  	router.post("/sell", book.post);
  	// router.post("/", user.postUsers);

  	return router;
}();