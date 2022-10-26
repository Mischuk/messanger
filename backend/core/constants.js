const config = require('config');

const PORT = 8000;
const SECRET_KEY = config.get('jwtSecret');
const API_DELAY = 1000;

const STATUS = {
    INFO: 100,
    SUCCESSFUL: 200,
    CREATED: 201,
    REDIRECT: 300,
    CLIENT_ERROR: 400,
    SERVER_ERROR: 500,
};

module.exports = {
    PORT,
    STATUS,
    SECRET_KEY,
    API_DELAY,
};
