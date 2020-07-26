if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config({ path: './config/.env' });
}
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

connectDB();

app.use(express.json());

app.use(
	'/api_v1_graphql',
	graphqlHTTP({
		schema: buildSchema(`
			type RootQuery {
				helloWorld: ID
			}
			schema {
				query: RootQuery
			}
		`),
		rootValue: { hello: () => {} },
		graphiql: process.env.NODE_ENV === 'production' ? false : true,
	})
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
