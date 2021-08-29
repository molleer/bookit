import { join } from "path";

import { graphqlHTTP } from "express-graphql";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { getResolvers } from "../resolvers";

// Import types
import express from "express";
import { Tools } from "../utils/commonTypes";

const setupAuth = (app: express.Application, { passport }: Tools) => {
  app.get("/api/login", passport.authenticate("gamma"));
  app.get(
    "/api/callback",
    passport.authenticate("gamma"),
    (req: express.Request, res: express.Response) => {
      res.send(req.user).end(200);
    },
  );
};

const setupGraphql = (app: express.Application, tools: Tools) => {
  const graphiql = process.env.GRAPHIQL == "true";
  const typeDefs = mergeTypeDefs(
    loadFilesSync(join(__dirname, "../schemas/v1/*.gql")),
  );

  app.use(
    "/api/graphql/v1",
    (req: express.Request, res: express.Response, next: () => void) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.send("User not logged in").end(401);
    },
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

export const setupRoutes = (app: express.Application, tools: Tools) => {
  setupAuth(app, tools);
  setupGraphql(app, tools);
};
