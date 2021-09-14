import { Event } from "../models/event";
import pg from "pg";

export const getEvents = (db: pg.Pool): Promise<pg.QueryResult<Event[]>> =>
  db.query<Event[]>(
    "SELECT id, party_report_id, start, end_date as end, phone,\
    description, title, created_at, updated_at, room FROM event",
  );

export const getPartyEvents = (db: pg.Pool): Promise<pg.QueryResult<Event>> =>
  db.query<Event>(
    "SELECT id, party_report_id, start, end_date as end, phone,\
    description, title, created_at, updated_at, room FROM event \
    WHERE party_report_id IS NOT NULL",
  );

export const getEventsFT = (
  db: pg.Pool,
  from: string,
  to: string,
): Promise<pg.QueryResult<Event[]>> =>
  db.query<Event[]>(
    "SELECT id, party_report_id, start, end_date as end,\
    description, title, created_at, updated_at, room, phone \
    FROM event WHERE $1 <= end_date AND $2 >= start",
    [from, to],
  );

export const getEvent = (
  db: pg.Pool,
  id: string,
): Promise<pg.QueryResult<Event>> =>
  db.query<Event>(
    "SELECT id, party_report_id, start, end_date as end,\
    description, title, created_at, updated_at, room, phone \
    FROM event WHERE id=$1",
    [id],
  );

export const createEvent = (db: pg.Pool, event: Event) =>
  db.query(
    "INSERT INTO event (start, party_report_id, end_date, description,\
    title, room, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [
      event.start,
      event.party_report_id,
      event.end,
      event.description,
      event.title,
      event.room,
      event.phone,
    ],
  );

export const getOverlapEvent = (
  db: pg.Pool,
  { start, end, room }: Event,
): Promise<pg.QueryResult<Event[]>> =>
  db.query(
    "SELECT id, party_report_id, start, end_date as end,\
    description, title, created_at, updated_at, room \
    FROM event WHERE $1 < end_date AND $2 > start AND room = $3",
    [start, end, room],
  );
