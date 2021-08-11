import { Tools } from "../utils/commonTypes";
import { getEventMResolvers, getEventQResolvers } from "./event.resolver";

export const getResolvers = (tools: Tools) => {
  return {
    Query: {
      ...getEventQResolvers(tools),
    },
    Mutation: {
      ...getEventMResolvers(tools),
    },
  };
};
