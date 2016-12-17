var express = require('express');
var bodyparser = require('body-parser');

var configs = require('./config/config'+ (process.env.NODE_ENV || ''));
var connection = require('./server/db/connection');


var routes = require('./server/routes/routes');
var sunShade = require('./server/models/sunshade');
var wristBand = require('./server/models/wristband');


var app  = express();
app.use(bodyparser.urlencoded({
  extended : true
}));

app.use(bodyparser.json());

var server = app.listen(configs.NODEJS_PORT, configs.NODEJS_IP, function(){
  console.log('%s: Node server started on %s:%d', Date(Date.now()), configs.NODEJS_IP, configs.NODEJS_PORT);
  connection.init();
  routes.configure(app);
  
  sunShade.initTable();
  // wristBand.initTable();

  app.get('/', function(req, res){
    res.status(200).json({
      "message":"Server working"
    });
  });
});
