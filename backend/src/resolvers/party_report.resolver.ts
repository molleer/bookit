import { to } from "../utils";
import { Tools } from "../utils/commonTypes";
import pg from "pg";
import { PartyReport } from "../models/party_report";
import { Event } from "../models/event";
import {
  getPartyReport,
  getPartyReports,
  JoinedPartyReport,
  toPartyReport,
} from "../repositories/party_report.repository";

export const getPartyReportQResolvers = (tools: Tools) => ({
  party_reports: async () => {
    const { err, res } = await to<pg.QueryResult<JoinedPartyReport>>(
      getPartyReports(tools.db),
    );
    if (err) {
      console.log(err);
      return [];
    }
    return res?.rows.map(e => toPartyReport(e));
  },
});

export const getPartyReportResolvers = (tools: Tools) => ({
  Event: {
    party_report: async (root: Event, args: any) => {
      const { err, res } = await to<pg.QueryResult<PartyReport>>(
        getPartyReport(tools.db, string(root.id)),
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
