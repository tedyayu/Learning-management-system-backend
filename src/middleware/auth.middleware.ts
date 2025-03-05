import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getStudentById } from "../services/student";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers["authorization"];
        console.log(authHeader);
        let token: string | undefined;
        if (typeof authHeader === "string") {
            token = authHeader.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({ error: "User is not authenticated" });
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const user = await getStudentById(decoded.id);
        if (!user) {
            res.status(401).json({ error: "User is not authenticated" });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "An error occurred while authenticating user" });
        return;
    }

}