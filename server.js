var express = require('express');
var bodyparser = require('body-parser');

var configs = require('./config/config');
var connection = require('./server/db/connection');


var routes = require('./server/routes/routes');
var sunshade = require('./server/models/sunshade');
var wristband = require('./server/models/wristband');
var customer = require('./server/models/customer');
var beachlounger = require('./server/models/beachlounger');
var payment = require('./server/models/payment');

var app  = express();
app.use(bodyparser.urlencoded({
  extended : true
}));

app.use(bodyparser.json());

var server = app.listen(configs.NODEJS_PORT, configs.NODEJS_IP, function(){
  console.log('%s: Node server started on %s:%d', Date(Date.now()), configs.NODEJS_IP, configs.NODEJS_PORT);
  connection.init();
  routes.configure(app);

  customer.initTable();
  wristband.initTable();
  sunshade.initTable();
  beachlounger.initTable();
  payment.initTable();

  app.get('/', function(req, res){
    res.status(200).json({
      "message":"Server working"
    });
  });
});
