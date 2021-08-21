import pg from "pg";
import { Rule } from "../models";
import { getRuleById, getRules } from "../repositories/rule.repository";
import { createRule } from "../services/rule.service";
import { to } from "../utils";
import { Tools } from "../utils/commonTypes";

export const getRuleQResolvers = ({ db }: Tools) => ({
  rules: async (): Promise<Rule[]> => {
    const { err, res } = await to<pg.QueryResult<Rule>>(getRules(db));
    if (err) {
      console.log(err);
      return [];
    }
    return res ? res?.rows : [];
  },
  rule: async (_: any, { id }: { id: string }): Promise<Rule | null> => {
    const { err, res } = await to<pg.QueryResult<Rule>>(getRuleById(db, id));
    if (err) {
      console.log(err);
      return null;
    }
    if (!res || res.rowCount <= 0) {
      console.log("Rule not found");
      return null;
    }
    return res.rows[0];
  },
});

export const getRuleMResolvers = ({ db }: Tools) => ({
  createRule: async (_: any, { rule }: { rule: Rule }) => createRule(db, rule),
});
