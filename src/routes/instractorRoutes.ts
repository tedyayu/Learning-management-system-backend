import express from "express";
import { registerInstructor , getAllInstractor , getSingleInstractor, updateProfile, updatePassword} from "../controller/instractorController";
import { get } from "http";

const router=express.Router();

router.post("/registerInstractor", registerInstructor);
router.post("/updateProfile/:userId", updateProfile);
router.post("/updatePassword/:userId", updatePassword)
router.get("/all",getAllInstractor);
router.get("/:id",getSingleInstractor);

export default router;