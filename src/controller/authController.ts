import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createStudent, getStudentById } from "../services/student";
import { getStudentByUserName } from "../services/student";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import ConflictError from "../errors/conflict.error";



export const registerStudent = asyncHandler(async (req:Request,res:Response) => {
    const {username,password,ID_NO,email ,department}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    const user = await getStudentByUserName(username);
    if (user) throw new ConflictError("User already exists");

    const newStudent = createStudent({
        username,
        password:hashedPassword,
        ID_NO,
        email,
        department
    })
    res.json(newStudent)
});

export const loginUser= asyncHandler(async (req:Request,res:Response)=>{
    const {username, password}= req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }    
    try {

        if (username === adminUsername && password === adminPassword) {
            const token = jwt.sign({ username, role: 'ADMIN' }, secret, { expiresIn: "1h" });
            console.log("Admin token:", token);
            res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
            res.json({ message: "Login successful", username, role: "ADMIN" });
            return;
        }
            

        const user=await getStudentByUserName(username);
        console.log(user);
        
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials - User not found" });
        }
        if (!user.password) {
            return res.status(500).json({ error: "User password not set in database" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", passwordMatch); 

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials - Password mismatch" });
        }
      
        const token = jwt.sign({ id: user.id, role: user.role },secret, { expiresIn: "1h" });
        

        console.log(token,user);
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
        res.json({ user});
    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
});

export const logOutUser = asyncHandler(async (req: Request, res: Response) => {
    console.log("cookies",req.cookies);
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0), 
            secure: false, 
            sameSite: 'strict'
        });

        res.status(200).json({ message: "Logged out successfully" });
   
});