export class ErrorHandler extends Error {
    status: number;
    message: string;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    }

}
