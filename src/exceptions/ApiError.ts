import { AppError } from './AppError';

export class ApiError extends AppError {
    statusCode = 500;
    code = 'API_ERROR';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }

    serializeErrors() {
        return { message: this.message, code: this.code };
    }
}
