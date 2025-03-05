import express from "express";
import { registerInstructor } from "../controller/instractorController";
import {authenticateUser} from "../middleware/auth.middleware"

const router=express.Router();

router.post("/registerInstractor",registerInstructor);

export default router;