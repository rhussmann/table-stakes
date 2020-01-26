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
  return db.runSql("CREATE USER IF NOT EXISTS 'tablestakes'@'%' IDENTIFIED BY ?", process.env.MYSQL_USER_PASSWORD)
    .then(() => {
      return db.runSql(`GRANT ALL PRIVILEGES ON ${process.env.SELECTED_DATABASE}.* TO 'tablestakes'@'%'`)
    });
};

exports.down = function(db) {
  return db.runSql("DROP USER IF EXISTS 'tablestakes'@'%'");
};

exports._meta = {
  "version": 1
};
