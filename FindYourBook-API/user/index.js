router = require("express").Router();
isConnected = require('../middlewares/isConnected');

module.exports = function(){
	user = require('./user');

  	router.get("/", isConnected, user.getUser);
  	router.post("/", user.create);

  	return router;
}();