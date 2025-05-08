import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import { createInstructor } from "../services/instractor";
import { getInstractorByUserName , getInstractorsAll , getInstractorByUserID} from "../services/instractor";
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

export const getAllInstractor = asyncHandler(async (req: Request, res: Response) => {
    try {
        const instractors = await getInstractorsAll();
        res.json(instractors);
    } catch (error) {
        console.error("Error fetching instractor:", error);
        res.status(500).json({ error: "An error occurred while fetching instractors" });
    }
}
);

export const getSingleInstractor = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const instractor = await getInstractorByUserID(id);
        if (!instractor) {
            return res.status(404).json({ error: "Instructor not found" });
        }
        res.json(instractor);
    } catch (error) {
        console.error("Error fetching instructor:", error);
        res.status(500).json({ error: "An error occurred while fetching the instructor" });
    }
});
