import ApiError from "./apiError";

class NotFoundError extends ApiError {
    constructor(message: string) {
        super(404, message);
    }
}

export default NotFoundError;