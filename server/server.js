'use_strict';

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var port = 3000;

var metadataCtrl = require('./src/metadata/controllers');
var ingredientCtrl = require('./src/ingredients/controllers');
var recipeCtrl = require('./src/recipes/controllers');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('combined'));
app.use('/static', express.static(__dirname+'/static'));
app.use(metadataCtrl);
app.use(ingredientCtrl);
app.use(recipeCtrl);

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/static/index.html');
});

app.listen(port, () => {
  console.log('App is running on '+port);
});