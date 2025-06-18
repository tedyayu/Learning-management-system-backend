import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getStudentById } from "../services/student";
import {getInstractorById} from "../services/instractor"

interface User {
    id?: string;
    username?: string | null;
    password?: string | null;
    email?: string | null;
    role: string;
    studentId?: string | null;
    instructorId?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

declare module "express-serve-static-core" {
    interface Request {
        user?: User;
    }
}

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        console.log("Token from cookies:", token);

        if (!token) {
            res.status(401).json({ error: "User needs to be authenticated" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id?: string;
            username?: string;
            role: string;
        };
        console.log("Decoded token:", decoded);

        const adminUsername = process.env.ADMIN_USERNAME;

        let user;

        if (decoded.role === "STUDENT" && decoded.id) {
            user = await getStudentById(decoded.id);
        }else if(decoded.role === "INSTRUCTOR" && decoded.id){
            user=await getInstractorById(decoded.id)
        } else if (decoded.role === "ADMIN" && decoded.username === adminUsername) {
            user = {
                username: adminUsername,
                role: "ADMIN",
            };
        }

        if (!user) {
            res.status(401).json({ error: "User is not authenticated" });
            return;
        }

        req.user = user;
        console.log("Authenticated user:", req.user);
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "An error occurred while authenticating user" });
    }
};


