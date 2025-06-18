import express from "express";
import {authenticateUser} from "../middleware/auth.middleware"
import {submitAnnouncement, getAnnouncements, updateAnnouncement, deleteSelectedAnnouncement} from "../controller/authController";

const router=express.Router();

router.get("/adminDashboard", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

router.post("/adminAnnouncement",authenticateUser, submitAnnouncement);
router.get("/adminAnnouncements", getAnnouncements);
router.put("/adminAnnouncement/:id",authenticateUser, updateAnnouncement);
router.delete("/adminAnnouncement/:id",authenticateUser,deleteSelectedAnnouncement)


export default router;
