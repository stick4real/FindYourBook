var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

var BookSchema = new Schema({
	googleId: String,
    title: String,
    description: String,
    author: String,
    price: Number,
    state: String,
    userId: String,
    img: String
});

module.exports = mongoose.model('Book', BookSchema);