var User = require('../models/userModel');
var config = require('../config');
var jwt = require('jsonwebtoken');

// Create endpoint /api/users for POST
exports.create = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err) {
    if (err){
      res.send(err);
    } else {
      res.json({ message: 'New book reader added !' });
    }
  });
};

exports.getUser = function(req, res) {
  jwt.verify(req.headers.token, config.secret, function(err, decoded) {
    if (err) {
      console.log(err);
    } else {
      User.findById(decoded._id, function(err, user) {
        if (err)
          res.send(err);

        res.json(user);
      });
    }
  });
}

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};