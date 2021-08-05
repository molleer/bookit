const { join } = require("path");

const { graphqlHTTP } = require("express-graphql");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeTypeDefs } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const getResolvers = require("../resolvers");

const setupRoutes = (app, tools) => {
  const graphiql = !(process.env.NO_GRAPHIQL == "true");
  const typeDefs = mergeTypeDefs(
    loadFilesSync(join(__dirname, "../schemas/v1/*.gql")),
  );

  app.use(
    "/api/graphql/v1",
    graphqlHTTP({
      schema: makeExecutableSchema({
        typeDefs: typeDefs,
        resolvers: getResolvers(tools),
      }),
      graphiql: graphiql,
    }),
  );

  app.get("/", (_, res) => {
    res.redirect("/api/graphql/v1");
  });
};

module.exports = { setupRoutes };
