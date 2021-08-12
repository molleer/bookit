import {
  getEvents,
  getEvent,
  createEvent,
  getEventsFT,
} from "../repositories/event.repository";
import { to } from "../utils";
import { Tools } from "../utils/commonTypes";
import { Event } from "../models/event";
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
  eventsFT: async (_: any, ft: { from: String; to: String }) => {
    const { err, res } = await to<pg.QueryResult<Event[]>>(
      getEventsFT(db, ft.from, ft.to),
    );
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

export const getEventMResolvers = ({ db }: Tools) => ({
  createEvent: async (_: any, { event }: { event: Event }) => {
    const { err } = await to<pg.QueryResult<any>>(createEvent(db, event));
    if (err) {
      console.log(err);
      return false;
    }
    return true;
  },
});
