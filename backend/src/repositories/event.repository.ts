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
