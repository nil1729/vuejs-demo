const { buildSchema } = require('graphql');
module.exports = buildSchema(`
    type Customer {
        email: String!
        _id: ID!
        phone: String!
        city: String
        state: String
        address: String!
        firstName: String!
        lastName: String!
        updatedAt: String
    }
    input CustomerInput {
        email: String!
        phone: String!
        city: String
        state: String
        address: String!
        firstName: String!
        lastName: String!
    }
    type RootQuery {
        customers: [Customer!]!
        customer(_id: ID!): Customer!
    }
    type RootMutation {
        createCustomer(customerInput: CustomerInput!): Customer!
        updateCustomer(_id: ID!, customerInput: CustomerInput!): Customer!
        deleteCustomer(_id: ID!): Customer!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
