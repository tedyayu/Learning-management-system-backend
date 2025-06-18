import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import bcrypt from "bcryptjs";
import { createInstructor } from "../services/instractor";
import { getInstractorByUserName , getInstractorsAll , getInstractorByUserID,updateInstractorProfile, updateInstractorPassword} from "../services/instractor";
import ConflictError from "../errors/conflict.error";
import AuthenticatedRequest from "../utils/authenticated.request";


export const registerInstructor = asyncHandler(async (req: Request, res: Response) => {
  
    const {username,password,instructorId,email }=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    const user = await getInstractorByUserName(username);
    if (user) throw new ConflictError("User already exists");

    const newInstructor = await createInstructor({
        username,
        password:hashedPassword,
        instructorId,
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

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {profilePhoto, firstName, lastName, email,language,phoneNumber,bio, expertise,linkedin, twitter} = req.body;
        const  {userId}  = req.params;

       await updateInstractorProfile( profilePhoto, firstName, lastName, email,language,phoneNumber,bio, expertise,linkedin, twitter, userId);
        res.json({ message: "Student profile updated successfully" });
    } catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ error: "An error occurred while updating student profile" });
    }
});

export const updatePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    try {                   
        const {currentPassword, newPassword} = req.body; 
        const  {userId}  = req.params;    
       
        const instractor = await getInstractorByUserID(userId);
        if (!instractor) {
            return res.status(401).json({ error: "The password you entered is not similar to your current password" });
        }
        if (!instractor.user?.password) {
            return res.status(401).json({ error: "The password you entered is not similar to your current password" });
        }
        const isCurrentPassword = await bcrypt.compare(currentPassword, instractor.user.password);
        if(!isCurrentPassword) return res.status(401).json({error:"Invalid credentials"});
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await updateInstractorPassword(newHashedPassword, userId);
        res.json({ message: "Student password updated successfully" });
    } catch (error) {
        console.error("Error updating student password:", error);
        res.status(500).json({ error: "An error occurred while updating student password" });
    }  
});
