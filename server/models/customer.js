var connection = require('../db/connection');

function customer() {
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Customer c JOIN Wristband w ON w.IdCustomer = c.IdCustomer;', function(err, result) {
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
            con.query('SELECT * FROM Customer c JOIN Wristband w ON w.IdCustomer = c.IdCustomer WHERE c.IdCustomer = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get Customer with id " + id + "failed : " + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.create = function(customer, res) {
        var wrist = {
            wrist_code: customer.wrist_code,
            credit: customer.credit
        };
        delete customer.wrist_code;
        delete customer.credit;
        connection.acquire(function(err, con) {
            con.query('INSERT INTO Customer SET ?', customer, function(err, result) {
                if (err) {
                    res.status(500).json({
                        "message": "Creation of the customer failed" + err
                    });
                } else {
                    wrist.IdCustomer = result.insertId;
                    con.query('INSERT INTO Wristband SET ?', wrist, function(err, resultW) {
                        con.release();
                        if (err) {
                            res.status(500).json({
                                "message": "Creation of the wristband failed" + err
                            });
                        } else {
                            res.status(200).json(result);
                        }
                    });
                }
            });
        });
    }

    this.update = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('UPDATE Customer SET ? WHERE id = ?', [customer, id], function(err, result) {
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
            con.query('DELETE FROM Customer WHERE id = ?', [id], function(err, result) {
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
                '`CustomerCode` VARCHAR (5) NOT NULL, ',
                '`Name` VARCHAR (15), ',
                '`Surname` VARCHAR (20), ',
                '`Stato` VARCHAR (1), ',
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

    this.getCustomerSunshade = function(req, res) {
        connection.acquire(function(err, con) {
            con.query([
                'SELECT *',
                'FROM Customer c, Sunshade s',
                'WHERE c.IdSunshade = s.IdSunshade;'
            ].join(' '), function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Bad request..Select failed" + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }
}

module.exports = new customer();
