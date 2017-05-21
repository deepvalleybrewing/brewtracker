'use_strict';

module.exports = (function() {
  let db = require('./../../lib/db/db');

  // Base Class constructor
  let Metadata = function(tableName) {
    class Model {
      constructor(name) {
        this.name = name;
      }
      static all() {
        let stmnt = db.sql.metadata[tableName].select.all;
        return db.conn.query(stmnt).then( (data) => {
          return data.rows;
        });
      }
      static delete(id) {
        let stmnt = db.sql.metadata[tableName].delete;
        return db.conn.query(stmnt, [id]).then( (data) => {
          return data.rowCount === 1 ? true : false;
        });
      }
      static get(id) {
        let stmnt = db.sql.metadata[tableName].select.id;
        return db.conn.query(stmnt, [id]).then( (data) => {
          return data.rows[0];
        });
      }
      save() {
        let stmnt = db.sql.metadata[tableName].insert;
        return db.conn.query(stmnt, [this.name])
          .then( (data) => {
            return data.rows[0].id;
          })
          .then(this.get);
      }
    };
    return Model;
  };


  class Brand extends Metadata('brand') {
    constructor(name, originCountry) {
      this.name = name;
      this.origin = originCountry;
    }
  };


  class Origin extends Metadata('origin') {
    constructor(countryName, continent) {
      super(countryName);
      this.continent = continent;
    }
    static countries() {
      let stmnt = db.sql.metadata.origin.mapping.country;
      return db.conn.query(stmnt);
    }
    static continents() {
      let stmnt = db.sql.metadata.origin.mapping.continent;
      return db.conn.query(stmnt);
    }
  };


  class Temperature extends Metadata('temperature_scale') {
    constructor(name, abbreviation) {
      super(name)
      this.abbreviation = abbreviation;
    }
    static abbreviations() {
      let stmnt = db.sql.metadata.temperature.select.all;
      return db.conn.query(stmnt);
    }
  };


  class UnitOfMeasure extends Metadata('unit_of_measure') {
    constructor(name, abbreviation) {
      super(name);
      this.abbreviation = abbreviation;
    }
    static abbreviations() {
      let stmnt = db.sql.metadata.unitOfMeasure.select.all;
      return db.conn.query(stmnt);
    }
  };


  return {
    brand: Brand,
    category: Metadata('category'),
    format: Metadata('format'),
    origin: Origin,
    temperature: Temperature,
    type: Metadata('type'),
    unitOfMeasure: UnitOfMeasure
  };
})();