var sunShade = require('../models/sunshade');
var configs = require('../../config/config'+(process.env.NODE_ENV || ''));

module.exports = {
  configure: function(app){
    app.get('/sunshade/', function(req, res){
      sunShade.getAll(res);
    });
    app.get('/sunshade/:id', function(req, res){
      sunShade.getOne(res.params.id, res);
    });

    app.post('/sunshade/', function(req, res){
      sunShade.create(req.body, res);
    });

    app.put('/sunshade/:id', function(req, res){
      sunShade.update(req.params.id, req.body, res);
    });

    app.put('/sunshade/:id', function(req, res){
      sunShade.delete(req.params.id, res);
    })
  }
}
