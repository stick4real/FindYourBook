var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

var BookSchema = new Schema({
	googleId: String,
    title: String,
    description: String,
    author: String,
    price: Number,
    state: String,
    _userId : { type: Schema.Types.ObjectId, ref: 'User' },
    img: String,
    status: Boolean
});

module.exports = mongoose.model('Book', BookSchema, 'Book');