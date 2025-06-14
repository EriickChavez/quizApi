import { AppError } from './AppError';

export class ValidationError extends AppError {
    statusCode = 400;
    code = 'VALIDATION_ERROR';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }

    serializeErrors() {
        return { message: this.message, code: this.code };
    }
}
