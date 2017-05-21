'use_strict';

module.exports = (function() {
  let db = require('./../../lib/db/db');

  let Ingredient = function(tableName) {
    class Model {
      constructor(brand, category, format, name, origin, type) {
        this.id = undefined;
        this.brand = brand;
        this.category = category;
        this.format = format;
        this.name = name;
        this.origin = origin;
        this.type = type
      }
      static all() {
        let stmnt = db.sql.ingredient[tableName].select.all;
        return db.conn.query(stmnt).then( (data) => {
          return data.rows;
        });
      }
      static brands() {
        let stmnt = db.sql.ingredient[tableName].mapping.brand;
        return db.conn.query(stmnt);
      }
      static formats() {
        let stmnt = db.sql.ingredient[tableName].mapping.format;
        return db.conn.query(stmnt);
      }
      static get(id) {
        let stmnt = db.sql.ingredient[tableName].select.id;
        return db.conn.query(stmnt, [id]).then( (data) => {
          return data.rows[0];
        });
      }
      save() {
        let vals = Object.values(this).sort();
        let stmnt = db.sql.ingredient[tableName].insert;
        return this._save(vals, stmnt);
      }
      static types() {
        let stmnt = db.sql.ingredient[tableName].mapping.type;
        return db.conn.query(stmnt);
      }
    };
    return Model;
  };
  


  class Adjunct extends Ingredient('adjunct') {
    constructor(type, name, origin, brand, format) {
      super(brand, 6, format, name, origin, type);
    }
  };


  class Grain extends Ingredient('grain') {
    constructor(type, name, origin, brand, lovibond, format) {
      super(brand, 'grain', format, name, origin, type);
      this.lovibond = lovibond;
    }
  };


  class Hop extends Ingredient('hop') {
    constructor(type, name, origin, brand, alphaAcid, format) {
      super(brand, 'hop', format, name, origin, type);
      this.alpha_acid = alphaAcid;
    }
  };


  class Yeast extends Ingredient('yeast') {
    constructor(brand, strain, origin, name, format, type, lowTemp, highTemp) {
      super(brand, 'yeast', format, name, origin, type);
      this.strain = strain;
      this.ferm_temp_low = lowTemp;
      this.ferm_temp_high = highTemp;
    }
  };


  return {
    adjunct: Adjunct,
    grain: Grain, 
    hop: Hop,
    yeast: Yeast
  };

})();