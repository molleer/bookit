import { Tools } from "../utils/commonTypes";

export const getEventQResolvers = (tools: Tools) => ({
  events: () => [{}],
  event: (id: Number) => null,
});
