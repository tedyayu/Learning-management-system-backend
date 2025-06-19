"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/registerStudent", auth_middleware_1.authenticateUser, authController_1.registerStudent);
router.post("/login", authController_1.loginUser);
router.post("/logout", authController_1.logOutUser);
exports.default = router;
