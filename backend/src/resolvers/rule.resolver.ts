import pg from "pg";
import { Rule } from "../models";
import { getRules } from "../repositories/rule.repository";
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
});

export const getRuleMResolvers = ({ db }: Tools) => ({
  createRule: async (_: any, { rule }: { rule: Rule }) => createRule(db, rule),
});
