var express     = require('express'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

var config = require('./config');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.PORT || 3000;

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

// Create endpoint handlers for /login
router.use('/login', require('./auth/index'));

// router.use(auth.authentification());

// Create endpoint handlers for /books
router.use('/books', require('./book/index'));

// Create endpoint handlers for /users
router.use("/users", require('./user/index'));

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);