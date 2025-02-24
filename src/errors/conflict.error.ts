import ApiError from "./apiError";

class ConflictError extends ApiError {
    constructor(message: string) {
        super(409, message);
    }
}

export default ConflictError;