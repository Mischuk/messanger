import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { STATUS } from '../enums/status';
import { API_DELAY, SECRET_KEY } from '../utils/constants';

const { users } = require('../data/users.json');

const router = Router();

router.post(
    '/signin',
    [body(['name', 'password']).isLength({ min: 1 })],
    async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(STATUS.CLIENT_ERROR).json({
                    message: 'Name and password is required',
                });
            }

            const { name, password } = req.body;

            const user = users.find((user: any) => user.name === name);

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

export default router;
