router = require("express").Router();

module.exports = function(){
	user = require('./user');

  	router.get("/", user.getUsers);
  	router.post("/", user.create);

  	return router;
}();