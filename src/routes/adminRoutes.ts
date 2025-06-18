import express from "express";
import {authenticateUser,authenticateAdmin} from "../middleware/auth.middleware"
import {submitAnnouncement, getAnnouncements, updateAnnouncement, deleteSelectedAnnouncement} from "../controller/authController";

const router=express.Router();

router.get("/adminDashboard", authenticateUser, authenticateAdmin, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

router.post("/adminAnnouncement", submitAnnouncement)
router.get("/adminAnnouncements", getAnnouncements);
router.put("/adminAnnouncement/:id", updateAnnouncement);
router.delete("/adminAnnouncement/:id",deleteSelectedAnnouncement)


export default router;
