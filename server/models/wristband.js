var connection = require('../db/connection');

function wristBand() {
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Wristband', function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get all wristband failed"
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    };

    this.getOne = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Wristband WHERE id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get wristband with id " + id + "failed : " + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    };

    this.create = function(wristband, res) {
        connection.acquire(function(err, con) {
            con.query('INSERT INTO Wristband SET ?', wristband, function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Creation of the Wristband failed"
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    };

    this.update = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('UPDATE Wristband SET ? WHERE id = ?', [wristband, id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "messgae": "Updating wristband with id" + id + "failed" + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    };

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('DELETE FROM Wristband WHERE id = ?', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Deleting wristband with id " + id + "failed " + err
                    });
                } else {
                    res.staus(200).json(result);
                }
            });
        });
    };

    this.initTable = function(req, res) {
        connection.acquire(function(err, con) {
            con.query([
                'CREATE TABLE IF NOT EXISTS `Wristband` ( ',
                '`IdWristband` BIGINT(20) NOT NULL AUTO_INCREMENT, ',
                '`credit` DECIMAL(15,2) NOT NULL, ',
                '`IdCustomer` BIGINT(20) NOT NULL, ',
                'PRIMARY KEY (`IdWristband`), ',
                'FOREIGN KEY (`IdCustomer`) REFERENCES `Customer` (`IdCustomer`)',
                'ON UPDATE CASCADE ON DELETE CASCADE',
                ')ENGINE=InnoDB;'
            ].join(' '), function(err, result) {
                if (err) throw err;
                if (!result.warningCount) {
                    console.log('Table WRISTBAND created with success');
                }
                con.release();
                return true;
            });
        });
    }
}

module.exports = new wristBand();
