import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getStudentById } from "../services/student";
import { getAdminByUserName } from "../services/admin/get.admin.service";

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
        console.log("Token from cokkies:", token);
        if (!token) {
            res.status(401).json({ error: "User needs to be authenticated" });
            return;
        }

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {id?: string, username?: string, role: string};
        console.log("the decoded user is",decoded)
        
        let user;
        if(decoded.id){
            user=await getStudentById(decoded.id);
            console.log("decoded user", user)
        }else if(decoded.username) {
            user = getAdminByUserName(decoded.username);
            console.log("decoded admin user", user)
        }
        
        if (!user) {
            res.status(401).json({ error: "User is not authenticated" });
            return;
        }
        req.user = { ...user, role: decoded.role };
        console.log("Authenticated user:", req.user);
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "An error occurred while authenticating user" });
        return;
    }
};

export const authenticateRole=(requiredRole:string)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(req.user && req.user.role===requiredRole){
            next();
        }else{
            res.status(403).json({error:"User does not have the required role"});
        }
    }
}

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
};
