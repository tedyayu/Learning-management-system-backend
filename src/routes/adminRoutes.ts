import express from "express";
import {authenticateUser,authenticateAdmin} from "../middleware/auth.middleware"

const router=express.Router();

router.get("/adminDashboard", authenticateUser, authenticateAdmin, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});

export default router;
