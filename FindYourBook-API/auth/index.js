router = require("express").Router();

module.exports = function(){
	auth = require('./auth');

  	router.post("/", auth.login);

  	return router;
}();