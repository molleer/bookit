import { join } from "path";

import { graphqlHTTP } from "express-graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { getResolvers } from "../resolvers";

// Import types
import Express from "express";
import { Tools } from "../utils/commonTypes";

export const setupRoutes = (app: Express.Application, tools: Tools) => {
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
