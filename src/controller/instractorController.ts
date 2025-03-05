import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import { createInstructor } from "../services/instractor";
import { getInstractorByUserName } from "../services/instractor";
import ConflictError from "../errors/conflict.error";

export const registerInstructor = asyncHandler(async (req: Request, res: Response) => {
  
    const {username,password,ID_NO,email }=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    const user = await getInstractorByUserName(username);
    if (user) throw new ConflictError("User already exists");

    const newInstructor = await createInstructor({
        username,
        password:hashedPassword,
        ID_NO,
        email
    })
    console.log(newInstructor);
    res.json(newInstructor)
});