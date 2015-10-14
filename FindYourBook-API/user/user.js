var User = require('../models/userModel');

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

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};