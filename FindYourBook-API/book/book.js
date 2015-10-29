var Book = require('../models/bookModel'),
    User = require('../models/userModel');

var _ = require('underscore');

// Create endpoint /api/books for POSTS
exports.sell = function(req, res) {
  // Create a new instance of the Book model

  var book = new Book();

  // Set the book properties that came from the POST data

  book.googleId = req.body.googleId;
  book.title = req.body.title;
  book.description = req.body.description;
  book.author = req.body.author;
  book.price = req.body.price;
  book.state = req.body.state;
  book._userId = req.FYB.decoded._id;
  book.img = req.body.img;
  book.status = true;

  // Save the book and check for errors
  book.save(function(err) {
    if (err){
      var errors = {error:[]};
      _.each(err.errors, function(element){
        errors.error.push(element.message);
      });
      res.json(errors);
    } else {
      User.findOneAndUpdate({ _id: req.FYB.decoded._id}, { $push:{ _books: book._id }}, {}, function(err, user){
        if (err)
          console.log(err);

        res.json({ message: 'Book added !', data: book});

      });
    }
  });
};

// Create endpoint /api/books/:book_id for GET
exports.getBooks = function(req, res) {

  Book.find({googleId: req.params.idBook, _userId: {'$ne': req.FYB.decoded._id} })
    .populate('_userId')
    .exec(function(err, books){
      if (err)
        res.send(err);
      res.json(books);
    });

};