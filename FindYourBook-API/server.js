var express     = require('express'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    passport    = require('passport');


var bookController = require('./controllers/bookController'),
    userController = require('./controllers/userController'),
    authController = require('./controllers/authController');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 3000;

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Build the connection string 
var dbURI = 'mongodb://localhost/FindYourBook'; 

mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// Create endpoint handlers for /books
router.route('/books')
  .post(authController.isAuthenticated, bookController.postBooks)
  .get(authController.isAuthenticated, bookController.getBooks);

// Create endpoint handlers for /books/:book_id
router.route('/books/:book_id')
  .get(authController.isAuthenticated, bookController.getBook)
  .put(authController.isAuthenticated, bookController.putBook)
  .delete(authController.isAuthenticated, bookController.deleteBook);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);