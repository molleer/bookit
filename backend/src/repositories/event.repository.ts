import { Event } from "../models/event";
import pg from "pg";

export const getEvents = (db: pg.Pool): Promise<pg.QueryResult<Event[]>> =>
  db.query<Event[]>(
    "SELECT id, start, end_date as end, description, title, created_at, updated_at, room FROM event",
  );

export const getEventsFT = (
  db: pg.Pool,
  from: String,
  to: String,
): Promise<pg.QueryResult<Event[]>> =>
  db.query<Event[]>(
    "SELECT id, start, end_date as end, description, \
    title, created_at, updated_at, room \
    FROM event WHERE $1 <= end_date AND $2 >= start",
    [from, to],
  );

export const getEvent = (
  db: pg.Pool,
  id: String,
): Promise<pg.QueryResult<Event>> =>
  db.query<Event>(
    "SELECT id, start, end_date as end, description, \
    title, created_at, updated_at, room \
    FROM event WHERE id=$1",
    [id],
  );

export const createEvent = (db: pg.Pool, event: Event) =>
  db.query(
    "INSERT INTO event (start, end_date, description, title, room) VALUES ($1, $2, $3, $4, $5)",
    [event.start, event.end, event.description, event.title, event.room],
  );

export const getOverlapEvent = (
  db: pg.Pool,
  { start, end, room }: Event,
): Promise<pg.QueryResult<Event[]>> =>
  db.query(
    "SELECT id, start, end_date as end, description, \
    title, created_at, updated_at, room \
    FROM event WHERE $1 < end_date AND $2 > start AND room = $3",
    [start, end, room],
  );
