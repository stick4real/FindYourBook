var config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
	if (req.headers.token) {

		jwt.verify(req.headers.token, config.secret, function(err, decoded) {
		  if (err) {
		  	console.log(err);
		  } else {
		  	next();
		  }
		});
	};
};