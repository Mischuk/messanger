import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './constants';

function authVerify(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization');

    try {
        if (token) {
            const verified = jwt.verify(token, SECRET_KEY);
            // req.user = verified;
            next();
        } else {
            res.status(401).send('Access denied!');
        }
    } catch (error) {
        res.status(400).send('Invalid token');
    }
}

export { authVerify };
