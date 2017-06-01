'use_strict';

module.exports = (function() {
  var models = require('./models');
  var router = require('express').Router();
  var utils = require(__dirname+'/../../lib/utils');

  // Ingredients by category

  router.get('/ingredient/:category', (req, res) => {
    let category = req.params.category;
    models[category].all().then( (data) => {
      let jsonResp = {};
      jsonResp[category] = data;
      res.json(jsonResp);
    });
  });

  router.get('/ingredient/:category/brand', (req, res) => {
    let category = req.params.category;
    let hashRows = utils.hashRowCfg('brand', 'brand_id');
    models[category].brands().then(hashRows).then( (data) => {
      res.json(data);
    });
  });

  router.get('/ingredient/:category/format', (req, res) => {
    let category = req.params.category;
    let hashRows = utils.hashRowCfg('format', 'format_id');
    models[category].formats().then(hashRows).then( (data) => {
      res.json(data);
    });
  });

  router.get('/ingredient/:category/type', (req, res) => {
    let category = req.params.category;
    let hashRows = utils.hashRowCfg('name', 'id');
    models[category].types().then(hashRows).then( (data) => {
      res.json(data);
    });
  });

  router.get('/ingredient/:category/:id', (req, res) => {
    let category = req.params.category;
    let ingrID = req.params.id;
    models[category].get(category, ingrID).then( (data) => {
      let jsonResp = {};
      jsonResp[category] = data;
      res.json(jsonResp);
    });
  });


  return router;
})();