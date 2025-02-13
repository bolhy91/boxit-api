import {Request, Response, NextFunction} from 'express';

export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly message: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err,
        });
    } else {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};