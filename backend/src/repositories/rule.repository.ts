import pg from "pg";
import { Rule, Event } from "../models";

export const getRules = (db: pg.Pool): Promise<pg.QueryResult<Rule>> =>
  db.query<Rule>(
    "SELECT id, day_mask, start_date, end_date, start_time,\
  end_time, description, allow, priority, title, created_at,\
  updated_at, room FROM rule",
  );

export const getRuleById = (
  db: pg.Pool,
  id: string,
): Promise<pg.QueryResult<Rule>> =>
  db.query(
    "SELECT id, day_mask, start_date, end_date, start_time,\
  end_time, description, allow, priority, title, created_at,\
  updated_at, room FROM rule WHERE id = $1",
    [id],
  );

export const getRulesByEvent = (
  db: pg.Pool,
  { start, end, room }: Event,
): Promise<pg.QueryResult<Rule>> =>
  db.query<Rule>(
    "SELECT id, day_mask, start_date, end_date, start_time,\
    end_time, description, allow, priority, title, created_at, updated_at,\
    room FROM rule WHERE $1 <= end_date AND $2 >= start_date AND $3 = ANY (room)",
    [start, end, room],
  );

export const createRule = (db: pg.Pool, rule: Rule) =>
  db.query(
    "INSERT INTO rule (day_mask, start_date, end_date, start_time,\
    end_time, description, allow, priority, title, room) VALUES \
    ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      rule.day_mask,
      rule.start_date,
      rule.end_date,
      rule.start_time,
      rule.end_time,
      rule.description,
      rule.allow,
      rule.priority,
      rule.title,
      rule.room,
    ],
  );

export const deleteRule = async (
  db: pg.Pool,
  id: String,
): Promise<pg.QueryResult> => db.query("DELETE FROM rule WHERE id=$1", [id]);
