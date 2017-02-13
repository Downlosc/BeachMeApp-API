var configsdev = {
    MYSQL_DB_HOST: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    MYSQL_DB_PORT: process.env.OPENSHIFT_MYSQL_DB_PORT || 32768,
    MYSQL_DB_USERNAME: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
    MYSQL_DB_PASSWORD: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root',
    NODEJS_IP: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    NODEJS_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
};

module.exports = configsdev;
