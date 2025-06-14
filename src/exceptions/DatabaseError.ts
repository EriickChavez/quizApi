import { AppError } from './AppError';

export class DatabaseError extends AppError {
    statusCode = 500;
    code = 'DATABASE_ERROR';

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }

    serializeErrors() {
        return { message: this.message, code: this.code };
    }
}
