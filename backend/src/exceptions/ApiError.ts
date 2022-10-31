import { STATUS } from '../enums/status';

type Errors = any[];

class ApiError extends Error {
    status = 0;
    errors: Errors = [];

    constructor(data: { status: number; message: string; errors?: Errors }) {
        const { status, message, errors } = data;
        super(message);
        this.status = status;
        this.errors = errors || [];
    }

    static UnauthorisedError() {
        return new ApiError({
            status: STATUS.UNAUTHORISED_USER,
            message: 'User is unauthorised',
        });
    }

    static BadRequest(message: string, errors?: Errors) {
        return new ApiError({
            status: STATUS.CLIENT_ERROR,
            message,
            errors: errors || [],
        });
    }
}

export { ApiError };
