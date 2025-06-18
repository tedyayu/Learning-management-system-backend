import express from "express";
import { fetchAllStudents ,searchStudents, updateProfile, updatePassword} from "../controller/studentController"; 
import {authenticateUser} from "../middleware/auth.middleware"
const router=express.Router();

router.get("/all",authenticateUser,fetchAllStudents)
router.get("/search",authenticateUser,searchStudents)
router.post("/updateProfile",authenticateUser, updateProfile);
router.post("/updatePassword",authenticateUser, updatePassword);


export default router;