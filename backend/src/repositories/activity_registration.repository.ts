import pg from "pg";
import { ActivityRegistration } from "../models/activity_registration";

export const getActReg = (
  db: pg.Pool,
  event_id: String,
): Promise<pg.QueryResult<ActivityRegistration>> =>
  db.query(
    "SELECT id, responsible_name, responsible_number, responsible_email, \
    co_responsible_name, co_responsible_number, co_responsible_email, \
    serving_permit, status FROM activity_registration WHERE event_id=$1",
    [event_id],
  );
