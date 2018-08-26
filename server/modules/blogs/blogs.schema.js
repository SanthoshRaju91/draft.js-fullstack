const typeDefs = `
    type Blog {
        id: ID!
        title: String!
        content: String!
        status: String!
    }

    type Success {
        success: Boolean!
        message: String!
    }

    type Query {
        getBlogs: [Blog]
        getBlog(id: ID!): Blog!
    }

    type Mutation {
        createBlog(title: String!, content: String!): Success!
    }
`;

module.exports = typeDefs;
