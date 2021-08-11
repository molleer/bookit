import { to } from "../utils";
import { Tools } from "../utils/commonTypes";
import pg from "pg";
import { ActivityRegistration } from "../models/activity_registration";
import { Event } from "../models/event";
import { getActReg } from "../repositories/activity_registration.repository";

export const getActRegistrationResolvers = (tools: Tools) => ({
  Event: {
    activity_registration: async (root: Event, args: any) => {
      const { err, res } = await to<pg.QueryResult<ActivityRegistration>>(
        getActReg(tools.db, String(root.id)),
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
