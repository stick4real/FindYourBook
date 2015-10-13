var express     = require('express'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    passport    = require('passport');


var bookController = require('./controllers/bookController'),
    userController = require('./controllers/userController'),
    authController = require('./controllers/authController');

var config = require('./config');

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

mongoose.connect(config.database); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
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

// app.all('/*', function(req, res, next) {
//     // CORS headers
//     res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     // Set custom headers for CORS
//     res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
//     if (req.method == 'OPTIONS') {
//         res.status(200).end();
//     } else {
//         next();
//     }
// });

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