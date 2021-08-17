import { Event } from "../models/event";
import { to } from "../utils";
import pg from "pg";
import * as events from "../repositories/event.repository";

export const createEvent = async (
  db: pg.Pool,
  event: Event,
): Promise<Boolean> => {
  if (new Date(event.start.toString()) >= new Date(event.end.toString())) {
    return false;
  }

  var { err, res } = await to<pg.QueryResult<Event[]>>(
    events.getOverlapEvent(db, event),
  );
  if (err) {
    console.log(err);
    return false;
  }

  if (!res || res?.rowCount > 0) {
    return false;
  }

  var { err } = await to<pg.QueryResult<any>>(events.createEvent(db, event));
  if (err) {
    console.log(err);
    return false;
  }
  return true;
};
