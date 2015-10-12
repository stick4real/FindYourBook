var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

var BookSchema = new Schema({
    name: String,
    price: Number,
    state: String,
    userId: String
});

module.exports = mongoose.model('Book', BookSchema);