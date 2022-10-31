import { NextFunction, Request, Response } from 'express';
import { STATUS } from '../enums/status';
import { ApiError } from '../exceptions/ApiError';

export default function (
    err: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log('middleware error', err instanceof Error);
    if (err instanceof Error) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }

    return res.status(STATUS.SERVER_ERROR).json({ message: 'Unknow error' });
}
