var connection = require('../db/connection');

function payment() {
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM payment', function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get all payment failed"
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.getPaymentPerWristbandId = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM payment WHERE IdWristband = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get payment with id " + id + "failed : " + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.create = function(payment, res) {
        connection.acquire(function(err, con) {
            con.query('INSERT INTO Payment SET ?', payment, function(err, result) {
                if (err) {
                    res.status(500).json({
                        "message": "Creation of the payment failed" + err
                    });
                } else {
                  //update wristBand table
                  con.query('SELECT credit FROM Wristband WHERE id = ?', [payment.IdWristband], function(err, result){
                    var credit = result.credit;
                    if (credit - payment.Value > 0){
                      credit = credit - payment.Value;
                      con.query('UPDATE Wristband SET credit = ? WHERE id = ?', [credit, payment.IdWristband], function(err, result){
                        con.release();
                        if(err){
                          res.status(500).json({
                            "message": "Update the payment failed" + err
                          });
                        }
                        else {
                          res.status(201).json({
                            "message" : "Credit updated seamlessly"
                          });
                        }
                      });
                    }
                    else {
                      res.status(500).json({
                        "message":"Payment not accepted"
                      });
                    }
                  })
                    res.status(200).json(result);
                }
            });
        });
    }



    this.initTable = function(req, res) {
        connection.acquire(function(err, con) {
            con.query([
              'CREATE TABLE IF NOT EXISTS `Payment`( ',
              '`IdPayment` BIGINT (20) NOT NULL AUTO_INCREMENT, ',
              '`IdWristband` BIGINT (20) NOT NULL, ',
              '`Service` VARCHAR (120), ',
              '`Date` DATE, ',
              '`Value` DECIMAL(15,2), ',
              'PRIMARY KEY (`IdPayment`), ',
              'FOREIGN KEY (`IdWristband`) REFERENCES `Wristband`(`IdWristband`)',
              ')ENGINE=InnoDB;'
            ].join(' '), function(err, result) {
                if (err) throw err;
                if (!result.warningCount) {
                    console.log('Table PAYMENT created with success');
                }
                con.release();
                return true;
            });
        });
    }

}

module.exports = new payment();
