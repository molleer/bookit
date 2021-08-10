const express = require("express");
const { Pool } = require("pg");
const { setupRoutes } = require("./routes");

const app = express();
const db = new Pool({
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

setupRoutes(app, { db });

app.listen(Number(process.env.PORT) || 8080);
