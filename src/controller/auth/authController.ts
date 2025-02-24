import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { createStudent } from "../../services/user";
import { getStudentByUserName } from "../../services/user";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../utils/asyncHandler";
import ConflictError from "../../errors/conflict.error";



export const registerUser = asyncHandler(async (req:Request,res:Response) => {
    const {username,password,ID_NO }=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    const user = await getStudentByUserName(username);
    if (user) throw new ConflictError("User already exists");

    const newStudent = createStudent({
        username,
        password:hashedPassword,
        ID_NO,
    })
    res.json(newStudent)
});

export const loginUser= asyncHandler(async (req:Request,res:Response)=>{
    const {username, password}= req.body;
    try {
        const user=await getStudentByUserName(username);
        if (user?.firstTimeLogin) return res.status(400).json("user need to reset the password !")
        if(!user ||!user.password || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error:"Invalid credentials"})
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token=jwt.sign({id:user.id}, secret, { expiresIn: "1h" });

        res.json({token,user})
    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
});


