import express from "express";
import { fetchAllStudents ,searchStudents, updateProfile, updatePassword} from "../controller/studentController"; 
import {authenticateUser} from "../middleware/auth.middleware"
const router=express.Router();

router.get("/all",fetchAllStudents)
router.get("/search",searchStudents)
router.post("/update",authenticateUser, updateProfile);
router.post("/updatePassword",authenticateUser, updatePassword);


export default router;