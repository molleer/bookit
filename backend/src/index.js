const express = require("express");
const { join } = require("path");

const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const getResolvers = require("./resolvers");

const graphiql = !(process.env.NO_GRAPHIQL == "true");

const app = express();

const typeDefs = mergeTypeDefs(
  loadFilesSync(join(__dirname, "schemas/v1/*.gql")),
);

app.use(
  "/api/graphql/v1",
  graphqlHTTP({
    schema: makeExecutableSchema({
      typeDefs: typeDefs,
      resolvers: getResolvers({}),
    }),
    graphiql: graphiql,
  }),
);

app.get("/", (_, res) => {
  res.redirect("/api/graphql/v1");
});

app.listen(Number(process.env.PORT) || 8080);
