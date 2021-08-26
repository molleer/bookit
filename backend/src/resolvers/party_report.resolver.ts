import { to } from "../utils";
import { Tools } from "../utils/commonTypes";
import pg from "pg";
import { PartyReport } from "../models/party_report";
import { Event } from "../models/event";
import {
  getPartyReport,
  getPartyReports,
} from "../repositories/party_report.repository";

export const getPartyReportQResolvers = (tools: Tools) => ({
  party_reports: async () => {
    const { err, res } = await to<pg.QueryResult<PartyReport>>(
      getPartyReports(tools.db),
    );
    if (err) {
      console.log(err);
      return [];
    }
    return res ? res.rows : [];
  },
});

export const getPartyReportResolvers = (tools: Tools) => ({
  Event: {
    party_report: async ({ party_report_id }: Event, args: any) => {
      if (!party_report_id) {
        return null;
      }
      const { err, res } = await to<pg.QueryResult<PartyReport>>(
        getPartyReport(tools.db, party_report_id),
      );
      if (err) {
        console.log(err);
        return null;
      }
      if (!res || res?.rows.length < 1) {
        return null;
      }
      return res.rows[0];
    },
  },
});
