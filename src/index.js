require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./data/resolvers.graphql");
const { typeDefs } = require("./data/schema.graphql");
const { PORT } = require("./config/config");
const { reqContext } = require("./utils");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers, context: reqContext });
  await server.start();
  server.applyMiddleware({ app });

  app.get("/", (req, res) => {
    console.log("Apollo GraphQL Express server is ready");
  });

  app.listen({ port: PORT }, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startApolloServer(typeDefs, resolvers);
