import express from "express";
import { registerStudent,loginUser } from "../controller/authController"; 

const router=express.Router();

router.post("/registerStudent",registerStudent);
router.post("/login",loginUser);


export default router;