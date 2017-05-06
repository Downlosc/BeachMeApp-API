var connection = require('../db/connection');

function sunshade() {
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Sunshade;', function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Get all sunshade failed: " + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    };

    this.getOne = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Sunshade s JOIN Customer c ON s.IdCustomer = c.IdCustomer WHERE s.IdSunshade = ?;', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        message: 'Get sunshade with id ' + id + ' failed: ' + err
                    });
                } else {
                    result[0].Customer = {
                        id: result[0].idCustomer,
                        name: result[0].Name,
                        surname: result[0].Surname,
                        status: result[0].Stato,
                        code: result[0].CustomerCode
                    };
                    delete result[0].idCustomer;
                    delete result[0].Name;
                    delete result[0].Surname;
                    delete result[0].Stato;
                    delete result[0].CustomerCode;
                    res.status(200).json(result);
                }
            });
        });
    };

    this.create = function(sunshade, res) {
        connection.acquire(function(err, con) {
            con.query('INSERT INTO Sunshade SET ?;', sunshade, function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Sunshade creation failed: " + err
                    });
                } else {
                    res.status(201).json({
                        "message": "Sunshade created successfully"
                    });
                }
            });
        });
    };

    this.update = function(id, sunshade, res) {
        connection.acquire(function(err, con) {
            con.query('UPDATE Sunshade SET ? WHERE id = ?;', [sunshade, id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Sunshade update failed: " + err
                    });
                } else {
                    res.status(200).json({
                        "message": "Updated successfully"
                    });
                }
            });
        });
    };

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('DELETE FROM Sunshade WHERE id = ?;', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Sunshade deletion failed: " + err
                    });
                } else {
                    res.status(200).json({
                        "message": "Deleted successfully"
                    });
                }
            });
        });
    };

    this.initTable = function() {
        connection.acquire(function(err, con) {
            if (err) throw err;
            con.query([
                'CREATE TABLE IF NOT EXISTS  `Sunshade` ( ',
                '`IdSunshade`   BIGINT(20) NOT NULL AUTO_INCREMENT, ',
                '`SunshadeNumber` VARCHAR(10) NOT NULL, ',
                '`IdCustomer`   BIGINT(20), ',
                '`Available` VARCHAR(1), ',
                '`Paid` VARCHAR(1), ',
                '`BookingDate` DATE, ',
                '`ExpiringDate` DATE, ',
                'PRIMARY KEY (`IdSunshade`),',
                'FOREIGN KEY (`IdCustomer`) REFERENCES `Customer`(`IdCustomer`)',
                'ON UPDATE CASCADE ON DELETE CASCADE',
                ')ENGINE=InnoDB;'
            ].join(' '), function(err, result) {
                if (err) throw err;

                if (!result.warningCount) {
                    console.log('Table SUNSHADE created with success');
                }
                con.release();
                return true;
            });
        });
    }
}

module.exports = new sunshade();
