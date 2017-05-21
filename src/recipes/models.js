'use_strict';

module.exports = (function() {
  let db = require('./../../lib/db/db');

  class WaterProfile {
    constructor(calcium, magnesium, sodium, chloride, sulfate, unit_of_measure) {
      this.calcium = calcium;
      this.magnesium = magnesium;
      this.sodium = sodium;
      this.chloride = chloride;
      this.sulfate = sulfate;
      this.unit_of_measure = unit_of_measure;
    }
    static all() {
      let stmnt = db.sql.recipe.waterProfile.select.all;
      return db.conn.query(stmnt).then( (data) => {
          return data.rows;
        });
    }

  };

  return {WaterProfile: WaterProfile};
})();