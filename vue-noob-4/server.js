if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: './config/.env' });
}
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

connectDB();

if (process.env.NODE_ENV !== 'production') {
	app.use(require('cors')());
}

app.use(express.json());
app.use(
	'/api_v1_graphql',
	graphqlHTTP({
		schema,
		rootValue: resolvers,
		graphiql: process.env.NODE_ENV === 'production' ? false : true,
	})
);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(__dirname + '/public/'));
	app.get('*', async (req, res) => {
		res.sendFile(__dirname + '/public/index.html');
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
