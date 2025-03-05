import { Request } from "express";

interface AuthenticatedRequest extends Request {
    user: {
        id: string;
    }};
export default AuthenticatedRequest;