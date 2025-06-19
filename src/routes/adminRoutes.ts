import express from "express";
import {submitAnnouncement, getAnnouncements, updateAnnouncement, deleteSelectedAnnouncement} from "../controller/authController";

const router=express.Router();

router.post("/adminAnnouncement", submitAnnouncement);
router.get("/adminAnnouncements", getAnnouncements);
router.put("/adminAnnouncement/:id", updateAnnouncement);
router.delete("/adminAnnouncement/:id",deleteSelectedAnnouncement)


export default router;
