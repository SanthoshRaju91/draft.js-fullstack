const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const typeDefs = require("./modules/blogs/blogs.schema");
const resolvers = require("./modules/blogs/blogs.resolver");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost:27017/draft",
  err => {
    if (err) console.error(`Failed to connect ${err}`);

    console.log(`Connected to MongoDB`);
  }
);

const server = new GraphQLServer({ typeDefs, resolvers });

const options = {
  port: 9000,
  endpoint: "/graphql",
  playground: "/playground"
};
server.start(options, ({ port }) =>
  console.log(`Server listening on Port: ${port}`)
);
