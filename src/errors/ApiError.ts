export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
