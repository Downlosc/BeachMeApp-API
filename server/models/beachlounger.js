var connection = require('../db/connection');

function beachlounger() {
    this.getAll = function(res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Beachlounger;', function(err, result) {
                if (err) {
                    res.status(500).json({
                        "message": "Get all beachlounger failed"
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.getOne = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('SELECT * FROM Beachlounger WHERE id = ?;', [id], function(err, result) {
                con.release();
                if (err) {
                    res.stauts(500).json({
                        "message": "Get beachlounger with id" + id + "failed: " + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.create = function(beachlounger, res) {
        connection.acquire(function(err, con) {
            con.query('INSERT INTO Beachlounger SET ?;', customer, function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Creation of the beachlounger failed" + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.update = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('UPDATE Beachlounger SET ? WHERE id = ?;', [customer, id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Updating beachlounger with id " + id + "failed" + err
                    });
                } else {
                    res.status(200).json(result);
                }
            });
        });
    }

    this.delete = function(id, res) {
        connection.acquire(function(err, con) {
            con.query('DELETE FROM Beachlounger WHERE id = ?;', [id], function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Deleting beachlounger with id" + id + "failed" + err
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
                'CREATE TABLE IF NOT EXISTS `Beachlounger`(',
                '`IdBeachlounger` BIGINT(20) NOT NULL AUTO_INCREMENT,',
                '`IdSunshade`     BIGINT(20) NOT NULL,',
                '`loungerCode`    VARCHAR(10) NOT NULL,',
                'PRIMARY KEY (`IdBeachlounger`),',
                'FOREIGN KEY (`IdSunshade`) REFERENCES `Sunshade`(`IdSunshade`)',
                'ON UPDATE CASCADE ON DELETE CASCADE',
                ')ENGINE=InnoDB;'
            ].join(' '), function(err, result) {
                if (err) throw err;
                if (!result.warningCount) {
                    console.log('Table BEACHLOUNGER created with success');
                };
                con.release();
                return true;
            });
        });
    }

    this.GetBeachLoungerPerSunshade = function(req, res) {
        connection.acquire(function(err, con) {
            con.query([
                'SELECT *',
                'FROM Beachlounger b JOIN Sunshade s  ON b.IdSunshade = s.IdSunshade;'
            ].join(' '), function(err, result) {
                con.release();
                if (err) {
                    res.status(500).json({
                        "message": "Bad request..SELECT failed " + err
                    });
                } else {
                    res.status(200).json(result)
                }
            });
        });
    }

}

module.exports = new beachlounger();
