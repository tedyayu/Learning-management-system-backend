"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controller/studentController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get("/all", auth_middleware_1.authenticateUser, studentController_1.fetchAllStudents);
router.get("/search", auth_middleware_1.authenticateUser, studentController_1.searchStudents);
router.post("/updateProfile", auth_middleware_1.authenticateUser, studentController_1.updateProfile);
router.post("/updatePassword", auth_middleware_1.authenticateUser, studentController_1.updatePassword);
exports.default = router;
