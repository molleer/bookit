import pg from "pg";
import { Rule, Event } from "../models";

export const getRulesByEvent = (
  db: pg.Pool,
  { start, end }: Event,
): Promise<pg.QueryResult<Rule[]>> =>
  db.query<Rule[]>(
    "SELECT id, day_mask, start_date, end_date, start_time,\
    end_time, allow, priority, title, created_at, update_at,\
    room FROM rule WHERE $1 <= end_date AND $2 >= start",
    [start, end],
  );
