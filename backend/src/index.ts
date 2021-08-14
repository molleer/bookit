import express from "express";
import pg from "pg";
import { setupRoutes } from "./routes";

const app = express();

pg.types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

const db = new pg.Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

setupRoutes(app, { db });

app.listen(Number(process.env.PORT) || 8080);
