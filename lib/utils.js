'use_strict';

module.exports = (function() {

  var extractMapSchema = function(requestObj) {
    let args = [];
    if(requestObj.query.name) {
      args = ['name', requestObj.query.id];
    } else if(requestObj.query.id) {
      args = ['id', requestObj.query.name];
    }
    return args.length ? args : null;
  };

  var hashRowCfg = function(key, val) {
    let hashRows = function(data) {
      let hash = {};
      data.rows.forEach((row) => {
        hash[row[key]] = row[val];
      });
      return hash;
    };
    return hashRows;
  };

  var parseMappingQuery = function(req) {
    let mapping = {};
    if(req.query.id) {
      mapping.key = req.query.id;
      mapping.val = 'name';
    } else if(req.query.name) {
      mapping.key = req.query.name;
      mapping.val = 'id';
    }
    return mapping;
  }

  return {
    extractMapSchema: extractMapSchema,
    hashRowCfg: hashRowCfg,
    parseMappingQuery: parseMappingQuery
  };

})();