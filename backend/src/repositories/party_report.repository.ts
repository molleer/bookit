import pg from "pg";
import { PartyReport } from "../models/party_report";

export const getPartyReport = (
  db: pg.Pool,
  id: string,
): Promise<pg.QueryResult<PartyReport>> =>
  db.query(
    "SELECT id, responsible_name, responsible_number, responsible_email, \
    co_responsible_name, co_responsible_number, co_responsible_email, \
    serving_permit, status FROM party_report WHERE id=$1",
    [id],
  );

export const getPartyReports = (
  db: pg.Pool,
): Promise<pg.QueryResult<PartyReport>> =>
  db.query(
    "SELECT id, responsible_name, responsible_number, responsible_email, \
    co_responsible_name, co_responsible_number, co_responsible_email, \
    serving_permit, status FROM party_report",
  );

export const createPartyReport = (
  db: pg.Pool,
  pr: PartyReport,
): Promise<pg.QueryResult<{ id: string }>> =>
  db.query(
    "INSERT INTO party_report (responsible_name, responsible_number,\
      responsible_email, co_responsible_name, co_responsible_number, \
      co_responsible_email, serving_permit) VALUES ($1, $2, $3, $4, $5, $6, $7)\
      RETURNING id",
    [
      pr.responsible_name,
      pr.responsible_number,
      pr.responsible_email,
      pr.co_responsible_name,
      pr.co_responsible_number,
      pr.co_responsible_email,
      pr.serving_permit,
    ],
  );
