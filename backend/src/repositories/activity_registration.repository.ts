import pg from "pg";
import {
  ActivityRegistration,
  RegistrationStatus,
} from "../models/activity_registration";
import { Room } from "../models/room";

export interface JoinedAR {
  event_id: String;
  start: String;
  end: String;
  description?: String;
  title: String;
  created_at: String;
  updated_at: String;
  room: Room[];

  id: String;
  responsible_name: String;
  responsible_number: String;
  responsible_email: String;
  co_responsible_name: String;
  co_responsible_number: String;
  co_responsible_email: String;
  serving_permit: Boolean;
  status: RegistrationStatus;
}

export const toActivityRegistration = (
  act: JoinedAR,
): ActivityRegistration => ({
  id: act.id,
  responsible_name: act.responsible_name,
  responsible_number: act.responsible_number,
  responsible_email: act.responsible_email,
  co_responsible_name: act.co_responsible_name,
  co_responsible_number: act.co_responsible_number,
  co_responsible_email: act.co_responsible_email,
  serving_permit: act.serving_permit,
  status: act.status,
  event: {
    id: act.event_id,
    start: act.start,
    end: act.end,
    description: act.description,
    title: act.title,
    created_at: act.created_at,
    updated_at: act.updated_at,
    room: act.room,
  },
});

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

export const getActRegs = (db: pg.Pool): Promise<pg.QueryResult<JoinedAR>> =>
  db.query(
    "SELECT event.id as event_id, activity_registration.id as id, start, end, description, title, \
    created_at, updated_at, room, \
    responsible_name, responsible_number, responsible_email, \
    co_responsible_name, co_responsible_number, co_responsible_email, \
    serving_permit, status \
    FROM activity_registration INNER JOIN event \
    ON event.id=activity_registration.event_id",
  );
