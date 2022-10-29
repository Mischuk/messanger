const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { STATUS, API_DELAY, SECRET_KEY } = require('../core/constants');
const bcrypt = require('bcryptjs');
const { users } = require('../data/users.json');
const jwt = require('jsonwebtoken');

const router = Router();

router.post(
    '/signin',
    [body(['name', 'password']).isLength({ min: 1 })],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(STATUS.CLIENT_ERROR).json({
                    message: 'Name and password is required',
                });
            }

            const { name, password } = req.body;

            const user = users.find((user) => user.name === name);

            if (!user) {
                return res.status(STATUS.CLIENT_ERROR).json({
                    field: 'name',
                    message: `User ${name} does not exist`,
                });
            }

            const isPasswordValid = await bcrypt.compare(
                password,
                user.password
            );

            if (!isPasswordValid) {
                return res
                    .status(STATUS.CLIENT_ERROR)
                    .json({ field: 'password', message: 'Invalid password' });
            }

            setTimeout(() => {
                res.json({
                    userId: user.id,
                    userName: user.name,
                    token: jwt.sign({ id: user.id }, SECRET_KEY, {
                        expiresIn: '24h',
                    }),
                });
            }, API_DELAY);
        } catch (e) {
            res.status(STATUS.CLIENT_ERROR).json({
                message: 'Something went wrong. Try again.',
            });
        }
    }
);

module.exports = router;
