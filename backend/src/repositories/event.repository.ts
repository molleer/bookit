import { Event } from "../models/event";
import pg from "pg";

export const getEvents = (db: pg.Pool): Promise<pg.QueryResult<Event[]>> =>
  db.query<Event[]>(
    "SELECT id, begin_date, end_date, description, title, created_at, updated_at, room FROM event",
  );

export const getEvent = (
  db: pg.Pool,
  id: String,
): Promise<pg.QueryResult<Event>> =>
  db.query<Event>(
    "SELECT id, begin_date, end_date, description, title, created_at, updated_at, room FROM event WHERE id=$1",
    [id],
  );

export const createEvent = (db: pg.Pool, event: Event) =>
  db.query(
    "INSERT INTO event (begin_date, end_date, description, title, room) VALUES ($1, $2, $3, $4, $5)",
    [
      event.begin_date,
      event.end_date,
      event.description,
      event.title,
      event.room,
    ],
  );
