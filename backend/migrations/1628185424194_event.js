/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("reservation", {
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
    activity_registration: {
      type: "uuid",
      foreignKey: true,
      references: "activity_registration(id)",
    },
    room: {
      type: "uuid",
      notNull: true,
    },
  });
};

exports.down = pgm => {};
