import passport from "passport";
import pg from "pg";

export interface Tools {
  db: pg.Pool;
  passport: passport.PassportStatic;
}
