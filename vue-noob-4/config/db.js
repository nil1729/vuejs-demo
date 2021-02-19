const mongoose = require('mongoose');
module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		});
		console.log('MongoDB connection Established');
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};
