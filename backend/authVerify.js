const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./core/constants');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    if (!token) res.status(401).send('Access denied!');
    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};
