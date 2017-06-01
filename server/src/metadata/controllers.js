'use_strict';

module.exports = (function() {
  let models = require('./models');
  let router = require('express').Router();
  let utils = require('./../../lib/utils');

  router.get('/metadata/origin', (req, res) => {
    models.origin.all().then( (origins) => {
      res.json({origins: origins});
    });
  });

  router.get('/metadata/origin/country', (req, res) => {
    let hashRows = utils.hashRowCfg('name', 'id');
    models.origin.countries().then(hashRows).then( (countries) => {
      res.json({countries: countries});
    });
  });

  router.get('/metadata/origin/country/abbreviation', (req, res) => {
    let hashRows = utils.hashRowCfg('abbreviation', 'id');
    models.origin.countries().then(hashRows).then( (countries) => {
      res.json({countries: countries});
    });
  });

  router.get('/metadata/origin/continent', (req, res) => {
    let hashRows = utils.hashRowCfg('name', 'id');
    models.origin.continents().then(hashRows).then( (continents) => {
      res.json({continents: continents});
    });
  });

  router.get('/metadata/origin/continent/abbreviation', (req, res) => {
    let hashRows = utils.hashRowCfg('abbreviation', 'id');
    models.origin.continents().then(hashRows).then( (continents) => {
      res.json({continents: continents});
    });
  });

  router.get('/metadata/temperature', (req, res) => {
    models.temperature.all().then( (units) => {
      res.json({units: units});
    });
  });

  router.get('/metadata/temperature/name', (req, res) => {
    let hashRows = utils.hashRowCfg('name', 'id');
    models.temperature.names().then(hashRows).then( (temps) => {
      res.json(temps)
    });
  });

  router.get('/metadata/temperature/abbreviation', (req, res) => {
    let hashRows = utils.hashRowCfg('abbreviation', 'id');
    models.temperature.names().then(hashRows).then( (temps) => {
      res.json(temps)
    });
  });

  router.get('/metadata/unit', (req, res) => {
    models.unitOfMeasure.all().then( (units) => {
      res.json({units: units});
    });
  });

  router.get('/metadata/unit/name', (req, res) => {
    let hashRows = utils.hashRowCfg('name', 'id');
    models.unitOfMeasure.names().then(hashRows).then( (units) => {
      res.json(units)
    });
  });

  router.get('/metadata/unit/abbreviation', (req, res) => {
    let hashRows = utils.hashRowCfg('abbreviation', 'id');
    models.unitOfMeasure.abbreviations().then(hashRows).then( (units) => {
      res.json(units);
    });
  });

  router.get('/metadata/:table', (req, res) => {
    let tableName = req.params.table;
    models[tableName].all().then( (data) => {
      let obj = {};
      obj[tableName] = data;
      res.json(obj);
    });
  });

  router.get('/metadata/:table/:id', (req, res) => {
    let tableName = req.params.table;
    let tableID = req.params.id;
    models[tableName].get(tableID).then( (data) => {
      res.json(data);
    });
  });

  router.post('/metadata/:table', (req, res) => {
    let tableName = req.params.table;
    let data = req.body;
    let newRow = new models[tableName](data.name)
    newRow.save().then( (data) => {
      res.json(data);
    });
  });

  router.delete('/metadata/:table/:id', (req, res) => {
    let tableName = req.params.table;
    let rowID = req.params.id;
    models[tableName].delete(rowID).then( (data) => {
      res.json(data);
    });  
  });


  return router;
})();