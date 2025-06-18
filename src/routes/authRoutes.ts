import express from "express";
import { registerStudent,loginUser ,logOutUser} from "../controller/authController"; 
import {authenticateUser} from "../middleware/auth.middleware"

const router=express.Router();

router.post("/registerStudent",authenticateUser,registerStudent);
router.post("/login",loginUser);
router.post("/logout", logOutUser);


export default router;