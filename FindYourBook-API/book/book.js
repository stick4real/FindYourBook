var Book = require('../models/bookModel');

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
  book.userId = req.user._id;

  // Save the book and check for errors
  book.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Book added !', data: book });
  });
};

// Create endpoint /api/books for GET
// exports.getBooks = function(req, res) {
//   // Use the Book model to find all books
//   Book.find({}, function(err, books) {
//     if (err)
//       res.send(err);

//     res.json(books);
//   });
// };

// // Create endpoint /api/books/:book_id for GET
// exports.getBook = function(req, res) {
//   // Use the Book model to find a specific book
//   Book.findById({ userId: req.user._id, _id: req.params.book_id }, function(err, book) {
//     if (err)
//       res.send(err);

//     res.json(book);
//   });
// };

// // Create endpoint /api/books/:book_id for PUT
// exports.putBook = function(req, res) {
//   // Use the Book model to find a specific book
//   Book.findById({ userId: req.user._id, _id: req.params.book_id }, function(err, book) {
//     if (err)
//       res.send(err);

//     // Update the existing book state
//     book.state = req.body.state;

//     // Save the book and check for errors
//     book.save(function(err) {
//       if (err)
//         res.send(err);

//       res.json(book);
//     });
//   });
// };

// // Create endpoint /api/books/:book_id for DELETE
// exports.deleteBook = function(req, res) {
//   // Use the Book model to find a specific book and remove it
//   Book.findByIdAndRemove({ userId: req.user._id, _id: req.params.book_id }, function(err) {
//     if (err)
//       res.send(err);

//     res.json({ message: 'Book deleted !' });
//   });
// };