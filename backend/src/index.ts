import express from "express";
import session from "express-session";
import pg from "pg";
import { setupRoutes } from "./routes";
import { init } from "./authentication/gamma.strategy";
import passport from "passport";
import redis from "redis";
const redisStore = require("connect-redis")(session);

const app = express();
init(passport);
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    store: new redisStore({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      client: redis.createClient(),
      password: process.env.REDIS_PASS,
    }),
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

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

setupRoutes(app, { db, passport });

app.listen(Number(process.env.PORT) || 8080);
