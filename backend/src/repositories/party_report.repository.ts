import pg from "pg";
import { PartyReport, RegistrationStatus } from "../models/party_report";
import { Room } from "../models/room";

export interface JoinedPartyReport {
  event_id: string;
  start: string;
  end: string;
  description?: string;
  title: string;
  created_at: string;
  updated_at: string;
  room: Room;

  id: string;
  responsible_name: string;
  responsible_number: string;
  responsible_email: string;
  co_responsible_name: string;
  co_responsible_number: string;
  co_responsible_email: string;
  serving_permit: boolean;
  status: RegistrationStatus;
}

export const toPartyReport = (report: JoinedPartyReport): PartyReport => ({
  id: report.id,
  responsible_name: report.responsible_name,
  responsible_number: report.responsible_number,
  responsible_email: report.responsible_email,
  co_responsible_name: report.co_responsible_name,
  co_responsible_number: report.co_responsible_number,
  co_responsible_email: report.co_responsible_email,
  serving_permit: report.serving_permit,
  status: report.status,
  event: {
    id: report.event_id,
    start: report.start,
    end: report.end,
    description: report.description,
    title: report.title,
    created_at: report.created_at,
    updated_at: report.updated_at,
    room: report.room,
  },
});

export const getPartyReport = (
  db: pg.Pool,
  event_id: string,
): Promise<pg.QueryResult<PartyReport>> =>
  db.query(
    "SELECT id, responsible_name, responsible_number, responsible_email, \
    co_responsible_name, co_responsible_number, co_responsible_email, \
    serving_permit, status FROM party_report WHERE event_id=$1",
    [event_id],
  );

export const getPartyReports = (
  db: pg.Pool,
): Promise<pg.QueryResult<JoinedPartyReport>> =>
  db.query(
    "SELECT event.id as event_id, party_report.id as id, start, end, description, title, \
    created_at, updated_at, room, \
    responsible_name, responsible_number, responsible_email, \
    co_responsible_name, co_responsible_number, co_responsible_email, \
    serving_permit, status \
    FROM party_report INNER JOIN event \
    ON event.id=party_report.event_id",
  );
