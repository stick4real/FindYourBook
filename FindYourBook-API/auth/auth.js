//load packages
var jwt = require('jsonwebtoken');

var User = require('../models/userModel');

var config = require('../config');

// Create endpoint /api/login for POST
exports.login = function(req, res) {
    // find the user
    console.log(req.body.username);
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) res.send(err);

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            user.verifyPassword(req.body.password, function(err, isMatch) {
                if (err) { return callback(err); }

                // Password did not match
                if (!isMatch) { 
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    user.token = null;

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 1440 // expires in 24 hours
                    });

                    user.token = token;
                    user.save();

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token,
                    });
                }   
            });
        }
    });
};