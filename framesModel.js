const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const frameSchema = new Schema({
	index: {
		type: Number,
		required: true
	},
	first: {
		type: Number,
		required: true
	},
	second: {
		type: Number,
		required: true
    },
    third: {
		type: Number,
		required: false
	},
	type: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Frames', frameSchema);