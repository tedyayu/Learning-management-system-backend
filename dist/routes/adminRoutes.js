"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const authController_1 = require("../controller/authController");
const router = express_1.default.Router();
router.get("/adminDashboard", auth_middleware_1.authenticateUser, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard" });
});
router.post("/adminAnnouncement", auth_middleware_1.authenticateUser, authController_1.submitAnnouncement);
router.get("/adminAnnouncements", authController_1.getAnnouncements);
router.put("/adminAnnouncement/:id", auth_middleware_1.authenticateUser, authController_1.updateAnnouncement);
router.delete("/adminAnnouncement/:id", auth_middleware_1.authenticateUser, authController_1.deleteSelectedAnnouncement);
exports.default = router;
