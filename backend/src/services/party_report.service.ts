import pg from "pg";
import { PartyReport } from "../models";
import { to } from "../utils";
import * as partyReportRepo from "../repositories/party_report.repository";

export const createPartyReport = async (
  db: pg.Pool,
  party_report: PartyReport,
): Promise<string | null> => {
  const { err, res } = await to<pg.QueryResult<{ id: string }>>(
    partyReportRepo.createPartyReport(db, party_report),
  );
  if (err) {
    console.log(err);
    return null;
  }
  return res && res.rows[0] ? res.rows[0].id : null;
};
