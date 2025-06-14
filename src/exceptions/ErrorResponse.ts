import { Response } from 'express';
import { AppError } from './AppError';

export interface ErrorResponse {
    success: boolean;
    message: string;
    data?: null;
    error: {
        code: string;
        details: string;
    };
}

export const sendErrorResponse = (
    res: Response,
    statusCode: number,
    error: AppError
) => {
    const serializedErrors = error.serializeErrors();

    return res.status(statusCode).json({
        success: false,
        message: error.message,
        data: null,
        error: {
            code: serializedErrors.code,
            details: serializedErrors.message,
        },
    });
};
