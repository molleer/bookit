/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createExtension("uuid-ossp");
  pgm.createTable("event", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v1()"),
    },
    title: {
      type: "text",
      notNull: true,
    },
    description: {
      type: "text",
    },
    begin_date: {
      type: "timestamp",
      notNull: true,
    },
    end_date: {
      type: "timestamp",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    room: {
      type: "text[]",
      notNull: true,
    },
  });
};

exports.down = pgm => {};
