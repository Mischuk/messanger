const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { STATUS } = require('../core/constants');
const { getUniqueID } = require('../core/utils');

const router = Router();

/*
    LOGIN
*/
router.post(
    '/signin',
    [body('name').isLength({ min: 1 }).withMessage('What is your name?')],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(STATUS.CLIENT_ERROR).json({
                    errors: errors.array(),
                    message: 'Wrong data for sign in',
                });
            }
            const { name } = req.body;
            const userId = getUniqueID();
            setTimeout(() => {
                res.json({ userId, userName: name });
            }, 500);
        } catch (e) {
            res.status(STATUS.CLIENT_ERROR).json({
                message: 'Something went wrong. Try again.',
            });
        }
    }
);

module.exports = router;

/*
    Add users.json
    Each user has { id, username, password }
    Add inputs to client: username, password
    JWT Token
*/
