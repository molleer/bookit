import { Tools } from "../utils/commonTypes";

const { getEventQResolvers } = require("./event.resolver");

export const getResolvers = (tools: Tools) => {
  return {
    Query: {
      ...getEventQResolvers(tools),
    },
    //Mutation: {},
  };
};
