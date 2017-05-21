'use_strict';

module.exports = (function(db, sql) {
  var models = require('./models');
  var router = require('express').Router();
  var utils = require(__dirname+'/../../lib/utils');

  router.get('/recipe/water-profile', (req, res) => {
    models.WaterProfile.all().then( (waterProfiles) => {
      res.json({waterProfiles: waterProfiles})
    });
  });

  return router;

})();