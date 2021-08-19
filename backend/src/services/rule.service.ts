import pg from "pg";
import { getRulesByEvent } from "../repositories/rule.repository";
import { Event, Rule } from "../models";
import { to } from "../utils";

const ms_24H = 86400000; // == 1000 * 60 * 60 * 24

export interface MiniRule {
  start: Date;
  end: Date;
  description: string;
  allow: boolean;
  priority: number;
}

const sameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() == d2.getFullYear() &&
    d1.getMonth() == d2.getMonth() &&
    d1.getDate() == d2.getDate()
  );
};

/**
 * 6  -> "06"
 * 16 -> "16"
 */
const zero = (n: number): string => {
  return n > 10 ? n.toString() : "0" + n;
};

export const day = (date: Date): string => {
  return `${date.getFullYear()}-${zero(date.getMonth() + 1)}-${zero(
    date.getDate(),
  )}`;
};

export const dayApplies = (date: Date, day_mask: number): boolean => {
  const dayIndex = (Math.floor(date.getDay()) + 6) % 7;
  return (day_mask >> dayIndex) % 2 > 0;
};

/**
 * Creates a list of time slots where each rule apply
 */
export const toMiniRules = (
  rules: Rule[],
  from: Date,
  to: Date,
): MiniRule[] => {
  const miniRules: MiniRule[] = [];
  for (const rule_i in rules) {
    var current = new Date(from);
    const end = new Date(rules[rule_i].end_date);
    while (true) {
      if (dayApplies(current, rules[rule_i].day_mask))
        miniRules.push({
          start: new Date(day(current) + "T" + rules[rule_i].start_time),
          end: new Date(day(current) + "T" + rules[rule_i].end_time),
          ...rules[rule_i],
        });
      if (!sameDay(current, to) && !sameDay(current, end)) {
        current = new Date(current.getTime() + ms_24H);
      } else {
        break;
      }
    }
  }
  return miniRules.sort((a, b): number => a.priority - b.priority);
};

//TODO: Merge miniRules into non-overlapping miniRules
export const mergeRules = (rules: MiniRule[]): MiniRule[] => {
  return [];
};

export const checkRules = async (
  db: pg.Pool,
  event: Event,
): Promise<boolean> => {
  const { err, res } = await to<pg.QueryResult<Rule[]>>(
    getRulesByEvent(db, event),
  );
  if (err) {
    console.log(err);
    return false;
  }

  //TODO: Execute check
  return false;
};
