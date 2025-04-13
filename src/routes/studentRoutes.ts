import express from "express";
import { fetchAllStudents ,searchStudents, updateProfile, updatePassword} from "../controller/studentController"; 
import {authenticateUser,authenticateRole} from "../middleware/auth.middleware"
const router=express.Router();

router.get("/all",fetchAllStudents)
router.get("/search",searchStudents)
router.post("/updateProfile",authenticateUser,authenticateRole('STUDENT'), updateProfile);
router.post("/updatePassword",authenticateUser,authenticateRole('STUDENT'), updatePassword);


export default router;