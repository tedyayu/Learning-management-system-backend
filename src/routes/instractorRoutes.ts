import express from "express";
import { registerInstructor , getAllInstractor , getSingleInstractor} from "../controller/instractorController";
import {authenticateUser} from "../middleware/auth.middleware"
import { get } from "http";

const router=express.Router();

router.post("/registerInstractor",registerInstructor);
router.get("/all",getAllInstractor);
router.get("/:id",getSingleInstractor);

export default router;