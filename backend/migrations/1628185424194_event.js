/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("event", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("uuid_generate_v1()"),
    },
    party_report_id: {
      type: "uuid",
      foreignKey: true,
      references: "party_report(id)",
      notNull: false,
    },
    phone: {
      type: "text",
      notNull: true,
    },
    title: {
      type: "text",
      notNull: true,
    },
    description: {
      type: "text",
    },
    start: {
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
      type: "text",
      notNull: true,
    },
  });
};

exports.down = pgm => {};
