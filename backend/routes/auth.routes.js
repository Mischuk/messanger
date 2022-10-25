const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { STATUS, API_DELAY } = require('../core/constants');
const { readFile } = require('../core/fs');
const bcrypt = require('bcryptjs');
const router = Router();

const getUsers = async () => {
    const data = await readFile('users.json');
    return data;
};
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

            const { users } = await getUsers();
            const { name, password } = req.body;

            const matchedUser = users.find((user) => user.name === name);

            if (!matchedUser) {
                return res
                    .status(STATUS.CLIENT_ERROR)
                    .json({
                        field: 'name',
                        message: `User ${name} does not exist`,
                    });
            }
            const isPasswordValid = await bcrypt.compare(
                password,
                matchedUser.password
            );

            if (!isPasswordValid) {
                return res
                    .status(STATUS.CLIENT_ERROR)
                    .json({ field: 'password', message: 'Invalid password' });
            }

            setTimeout(() => {
                res.json({
                    userId: matchedUser.id,
                    userName: matchedUser.name,
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
