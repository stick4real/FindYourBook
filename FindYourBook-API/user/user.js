var User = require('../models/userModel');
var config = require('../config');
var jwt = require('jsonwebtoken');
var _ = require('underscore');

// Create endpoint /api/users for POST
exports.create = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err){
      var errors = {error:[]};
      _.each(err.errors, function(element){
        errors.error.push(element.message);
      });
      res.json(errors);
    } else {
      res.json({ message: 'New book reader added !' });
    }
  });
};

exports.getUser = function(req, res) {
  User.findById( req.FYB.decoded._id )
    .populate('_books')
    .exec(function(err, user){
        if (err) 
          res.send(err);
        res.json(user);
    });
}