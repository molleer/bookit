import { getEvents, getEvent } from "../repositories/event.repository";
import { to } from "../utils";
import { Tools } from "../utils/commonTypes";
import pg from "pg";

export const getEventQResolvers = ({ db }: Tools) => ({
  events: async () => {
    const { err, res } = await to<pg.QueryResult<Event[]>>(getEvents(db));
    if (err) {
      console.log(err);
      return [];
    }
    return res?.rows;
  },
  event: async (_: any, { id }: { id: String }) => {
    const { err, res } = await to<pg.QueryResult<Event>>(getEvent(db, id));
    if (err) {
      console.log(err);
      return {};
    }
    if (!res || res?.rows.length < 1) return { id: "Hello" };
    return res?.rows[0];
  },
});
