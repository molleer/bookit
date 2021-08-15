import { Tools } from "../utils/commonTypes";
import { getEventMResolvers, getEventQResolvers } from "./event.resolver";
import {
  getPartyReportQResolvers,
  getPartyReportResolvers,
} from "./party_report.resolver";

export const getResolvers = (tools: Tools) => {
  return {
    Query: {
      ...getEventQResolvers(tools),
      ...getPartyReportQResolvers(tools),
    },
    Mutation: {
      ...getEventMResolvers(tools),
    },
    ...getPartyReportResolvers(tools),
  };
};
