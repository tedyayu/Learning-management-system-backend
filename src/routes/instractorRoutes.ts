import express from "express";
import { registerInstructor , getAllInstractor , getSingleInstractor, updateProfile, updatePassword} from "../controller/instractorController";
import {authenticateUser} from "../middleware/auth.middleware"
import { get } from "http";

const router=express.Router();

router.post("/registerInstractor",authenticateUser, registerInstructor);
router.post("/updateProfile/:userId",authenticateUser, updateProfile);
router.post("/updatePassword/:userId",authenticateUser, updatePassword)
router.get("/all",authenticateUser,getAllInstractor);
router.get("/:id",authenticateUser,getSingleInstractor);

export default router;