import pg from "pg";

export interface Tools {
  db: pg.Pool;
}
