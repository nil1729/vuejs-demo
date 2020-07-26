const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customerSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
