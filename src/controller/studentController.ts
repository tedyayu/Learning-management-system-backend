import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { fetchStudents ,searchStudent, getUserById, updateStudentProfile, updateStudentPassword} from "../services/student";
import AuthenticatedRequest from "../utils/authenticated.request";
import bcrypt from "bcryptjs";

export const fetchAllStudents = asyncHandler(async (req: Request, res: Response) => {
    try {
        const students = await fetchStudents();
        res.json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "An error occurred while fetching students" });
    }
});

export const searchStudents = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { query } = req.query;
        const student = await searchStudent(query as string);
        res.json(student);
    } catch (error) {
        console.error("Error searching student:", error);
        res.status(500).json({ error: "An error occurred while searching student" });
    }
});

export const updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {profilePhoto, firstName, lastName, email,language,phoneNumber} = req.body;
        const  {id}  = req.user;
        console.log("the req user from controller",id);
       
        await updateStudentProfile( profilePhoto, firstName, lastName, email,language,phoneNumber ,id);
        res.json({ message: "Student profile updated successfully" });
    } catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ error: "An error occurred while updating student profile" });
    }
});

export const updatePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    try {                   
        const {currentPassword, newPassword} = req.body;    
        const student = await getUserById(req.user.id);
        console.log(student?.password);
        if (!student || !student.password) {
            return res.status(401).json({ error: "The password you entered is not similar to your current password" });
        }
        const isCurrentPassword = await bcrypt.compare(currentPassword, student?.password);
        if(!isCurrentPassword) return res.status(401).json({error:"Invalid credentials"});
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await updateStudentPassword(newHashedPassword, req.user.id);
        res.json({ message: "Student password updated successfully" });
    } catch (error) {
        console.error("Error updating student password:", error);
        res.status(500).json({ error: "An error occurred while updating student password" });
    }  
});


