'use_strict';

module.exports = (function() {
  let fs = require('fs');
  let pg = require('pg');

  // Load DB configuration
  var cfgFile = fs.readFileSync(__dirname+'/../../cfg/db_cfg.json');
  var pgConfig = JSON.parse(cfgFile);

  // Create DB connection pool
  var pool = new pg.Pool(pgConfig);
  pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack);
  });

  // Load JSON file containing SQL statements
  var sqlFile = fs.readFileSync(__dirname+'/sql.json');
  var sql = JSON.parse(sqlFile);

  return {
    conn: pool,
    sql: sql
  };
})()