router = require("express").Router();
isConnected = require('../middlewares/isConnected');

module.exports = function(){
	console.log('router');
	user = require('./user');

  	router.get("/test", user.getUsers);
  	router.get("/", isConnected, user.getUser);
  	router.post("/", user.create);

  	return router;
}();