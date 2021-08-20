import { Event } from "../models/event";
import { to } from "../utils";
import pg from "pg";
import * as eventRepo from "../repositories/event.repository";
import { checkRules } from "./rule.service";

export const createEvent = async (
  db: pg.Pool,
  event: Event,
): Promise<boolean> => {
  if (new Date(event.start) >= new Date(event.end)) {
    return false;
  }

  var { err, res } = await to<pg.QueryResult<Event[]>>(
    eventRepo.getOverlapEvent(db, event),
  );
  if (err) {
    console.log(err);
    return false;
  }

  if (!res || res?.rowCount > 0) {
    return false;
  }

  if ((await checkRules(db, event)) !== "") {
    return false;
  }

  var { err } = await to<pg.QueryResult<any>>(eventRepo.createEvent(db, event));
  if (err) {
    console.log(err);
    return false;
  }
  return true;
};
