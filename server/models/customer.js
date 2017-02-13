var connection = require('../db/connection');

function customer() {
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM customer', function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get all customer failed"
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.getOne = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM customer WHERE id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get customer with id " + id + "failed : " + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.create = function(customer, res) {
        connection.acquire(function(err, con) {
            con.query('INSERT INTO customer SET ?', customer, function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Creation of the customer failed" + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.update = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('UPDATE customer SET ? WHERE id = ?', [customer, id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "messgae": "Updating customer with id" + id + "failed" + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('DELETE FROM customer WHERE id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Deleting customer with id " + id + "failed " + err
                    });
                } else {
                    res.staus(200).json(result);
                }
            });
        });
    }

    this.initTable = function(req, res) {
        connection.acquire(function(err, con) {
            con.query([
              'CREATE TABLE IF NOT EXISTS `Customer`( ',
              '`IdCustomer` BIGINT (20) NOT NULL AUTO_INCREMENT, ',
              '`IdSunshade` BIGINT (20) NOT NULL, ',
              '`Name` VARCHAR (15), ',
              '`Surname` VARCHAR (20), ',
              'PRIMARY KEY (`IdCustomer`) ',
              ')ENGINE=InnoDB;'
            ].join(' '), function(err, result) {
                if (err) throw err;
                if (!result.warningCount) {
                    console.log('Table CUSTOMER created with success');
                }
                con.release();
                return true;
            });
        });
    }

    this.getCustomerSunshade = function(req, res){
      connection.acquire(function(err, con){
        con.query([
          'SELECT *',
          'FROM Customer c, Sunshade s',
          'WHERE c.IdSunshade = s.IdSunshade;'
        ].join(' '), function (err, result) {
          con.release();
          if(err) {
            res.status(500).json({
              "message" : "Bad request..Select failed" + err
            });
          } else {
            res.status(200).json(result);
          }
        });
      });
    }
}

module.exports = new customer();
