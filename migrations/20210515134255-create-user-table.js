'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('users', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    fname: {
      type: 'string',
      length: 499
    },
    lname: {
      type: 'string',
      length: 499
    },
    email: {
      type: 'string',
      length: 499
    },
    role: {
      type: 'string',
      length: 499
    },
    phone: {
      type: 'string',
      length: 499
    },
    picture: {
      type: 'string',
      length: 499
    },
    password: {
      type: 'string',
      length: 499
    },
    token: {
      type: 'string',
      length: 499
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('CURRENT_TIMESTAMP')
    }
  });
};

exports.down = function(db) {
  return db.dropTable('users');
};

exports._meta = {
  "version": 1
};
