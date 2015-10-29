var mongoose 	= require('mongoose'),
	Schema 		= mongoose.Schema;

function checkText (v) {
    if (v != 'bad' && v != 'good' && v != 'perfect') {
        return false;
    } else {
        return true;
    }
};

var BookSchema = new Schema({
	googleId: String,
    title: String,
    description: String,
    author: String,
    price: Number,
    state: {
        type: String,
        validate: [checkText, 'Only handle bad, good, or perfect for the state']
    },
    _userId : { type: Schema.Types.ObjectId, ref: 'User' },
    img: String,
    status: Boolean
});

module.exports = mongoose.model('Book', BookSchema, 'Book');