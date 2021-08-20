/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("rule", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v1()"),
    },
    day_mask: {
      type: "integer",
      notNull: true,
      default: 0,
    },
    start_date: {
      type: "timestamp",
      notNull: true,
    },
    end_date: {
      type: "timestamp",
      notNull: true,
    },
    start_time: {
      type: "string",
      notNull: true,
    },
    end_time: {
      type: "string",
      notNull: true,
    },
    description: {
      type: "string",
      notNull: true,
    },
    allow: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    priority: {
      type: "integer",
      notNull: true,
      default: 10,
    },
    title: {
      type: "string",
      notNull: true,
    },
    room: {
      type: "text[]",
      notNull: true,
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: "now()",
    },
    update_at: {
      type: "timestamp",
      notNull: true,
      default: "now()",
    },
  });
};

exports.down = pgm => {};
