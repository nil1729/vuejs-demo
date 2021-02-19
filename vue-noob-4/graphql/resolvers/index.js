const Customer = require('../../models/Customer');
module.exports = {
	createCustomer: async args => {
		try {
			const { email, phone } = args.customerInput;
			let user = await Customer.findOne({ email });
			if (user) {
				throw 'Email is already used by another account';
			}
			user = await Customer.findOne({ phone });
			if (user) {
				throw 'Phone Number is already used by another account';
			}
			user = new Customer(args.customerInput);
			user = await user.save();
			return user;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	},
	updateCustomer: async args => {
		try {
			let user = await Customer.findById(args._id);
			if (!user) {
				throw 'No Customer Found with given data';
			}
			const { email, phone } = args.customerInput;
			user = await Customer.find({ email });
			if (user && user.length > 1) {
				throw 'Email is already used by another account';
			}
			user = await Customer.find({ phone });
			if (user && user.length > 1) {
				throw 'Phone Number is already used by another account';
			}
			user = await Customer.updateOne({ _id: args._id }, args.customerInput);
			user = await Customer.findById(args._id);
			return user;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	},
	deleteCustomer: async args => {
		try {
			let user = await Customer.findById(args._id);
			if (!user) {
				throw 'No Customer Found with given data';
			}
			user = await Customer.findByIdAndDelete(args._id);
			return user;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	},
	customers: async () => {
		try {
			let customers = await Customer.find().sort({ updatedAt: -1 });
			return customers;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	},
	customer: async args => {
		try {
			let customer = await Customer.findById(args._id);
			if (!customer) {
				throw 'No Customer Found with given data';
			}
			return customer;
		} catch (e) {
			console.log(e);
			throw new Error(e);
		}
	},
};
