import * as events from "../repositories/event.repository";
import { to } from "../utils";
import { Tools } from "../utils/commonTypes";
import { Event } from "../models/event";
import pg from "pg";
import { createEvent } from "../services/event.service";

export const getEventQResolvers = ({ db }: Tools) => ({
  events: async () => {
    const { err, res } = await to<pg.QueryResult<Event[]>>(
      events.getEvents(db),
    );
    if (err) {
      console.log(err);
      return [];
    }
    return res?.rows;
  },
  eventsFT: async (_: any, ft: { from: string; to: string }) => {
    const { err, res } = await to<pg.QueryResult<Event[]>>(
      events.getEventsFT(db, ft.from, ft.to),
    );
    if (err) {
      console.log(err);
      return [];
    }
    return res?.rows;
  },
  event: async (_: any, { id }: { id: string }) => {
    const { err, res } = await to<pg.QueryResult<Event>>(
      events.getEvent(db, id),
    );
    if (err) {
      console.log(err);
      return {};
    }
    if (!res || res?.rows.length < 1) return { id: "Hello" };
    return res?.rows[0];
  },
  party_events: async () => {
    const { err, res } = await to<pg.QueryResult<Event>>(
      events.getPartyEvents(db),
    );
    if (err) {
      console.log(err);
      return [];
    }
    return res ? res.rows : [];
  },
});

export const getEventMResolvers = ({ db }: Tools) => ({
  createEvent: async (_: any, { event }: { event: Event }) =>
    createEvent(db, event),
});
