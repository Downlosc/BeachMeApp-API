// var config = {
//     MYSQL_DB_HOST: 'eu-cdbr-west-01.cleardb.com' || 'localhost',
//     MYSQL_DB_PORT: undefined,
//     MYSQL_DB_USERNAME: 'be10759f846630' || 'root',
//     MYSQL_DB_PASSWORD: 'a51b29d2' || 'root',
//     NODEJS_IP: process.env.NODEJS_IP || '127.0.0.1',
//     NODEJS_PORT: process.env.PORT || 8080,
// };

var config = {
      MYSQL_DB_HOST:'localhost',
      MYSQL_DB_PORT: 32768,
      MYSQL_DB_USERNAME: 'root',
      MYSQL_DB_PASSWORD: 'root',
      NODEJS_IP: process.env.NODEJS_IP || '127.0.0.1',
      NODEJS_PORT: process.env.PORT || 8080,
}
module.exports = config;
