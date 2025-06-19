import express from "express";
import { registerStudent,loginUser ,logOutUser} from "../controller/authController"; 

const router=express.Router();

router.post("/registerStudent",registerStudent);
router.post("/login",loginUser);
router.post("/logout", logOutUser);


export default router;