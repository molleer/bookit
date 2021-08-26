/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createExtension("uuid-ossp");
};

exports.down = pgm => {};
