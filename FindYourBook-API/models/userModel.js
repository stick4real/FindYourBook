var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs');

function checkLength (v) {
  return v.length > 3 && v.length < 20;
};

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: [checkLength, 'Username must contains between 3 and 20 characters']
  },
  password: {
    type: String,
    required: true,
    validate: [checkLength, 'Password must contains between 3 and 20 characters']
  },
  token: {
    type: String
  },
  _books : [{ type: Schema.Types.ObjectId, ref: 'Book' }]
});

UserSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Execute before each user.save() call
UserSchema.pre('save', function(callback) {
  var user = this;

  if (!user.isModified('password')) return callback();

  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      user.password = hash;
      callback();
    });
  });
});

module.exports = mongoose.model('User', UserSchema, 'User');