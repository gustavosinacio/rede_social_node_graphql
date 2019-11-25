const path = require("path");
const fs = require("fs");
const { ApolloServer } = require("apollo-server");
const { resolvers } = require("./graphql/resolvers");

// Async asyncread of file
const typeDefs = fs
  .readFileSync(path.join(__dirname, "graphql/schema.graphql"))
  .toString();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen("4000").then(({ url }) => {
  console.log(`Server started on ${url}`);
});
