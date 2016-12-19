var sunShade = require('../models/sunshade');
var wristBand = require('../models/wristband');
var customer = require('../models/customer');
var configs = require('../../config/config_' + (process.env.NODE_ENV || ''));

module.exports = {
    configure: function(app) {
        app.get('/sunshade/', function(req, res) {
            sunShade.getAll(res);
        });
        app.get('/sunshade/:id', function(req, res) {
            sunShade.getOne(req.params.id, res);
        });

        app.post('/sunshade/', function(req, res) {
            sunShade.create(req.body, res);
        });

        app.put('/sunshade/:id', function(req, res) {
            sunShade.update(req.params.id, req.body, res);
        });

        app.delete('/sunshade/:id', function(req, res) {
            sunShade.delete(req.params.id, res);
        })

        app.get('/wristband/', function(req, res) {
            wristBand.getAll(res);
        });
        app.get('/wristband/:id', function(req, res) {
            wristBand.getOne(res.params.id, res);
        });
        app.post('/wristband/', function(req, res) {
            wristBand.create(req.body, res);
        });
        add.put('/wristband/', function(req, res) {
            wristBand.update(req.params.id, res);
        });
        add.delete('wristband/:id', function(req, res) {
            wristBand.delete(req.params.id, res);
        });

        app.get('/customer/', function(req, res) {
            customer.getAll(res);
        });
        app.get('/customer/:id', function(reqm res) {
            customer.getOne(req.params.id, res);
        });
        app.post('/customer/', function(req, res) {
            customer.create(req.body, res);
        });
        app.put('/customer/:id', function(req, res) {
            customer.update(req.params.id, res);
        });
        app.delete('/customer/:id', function(req, res) {
            customer.delete(req.params.id, res);
        });
    }
}
