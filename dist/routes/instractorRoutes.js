"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instractorController_1 = require("../controller/instractorController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/registerInstractor", auth_middleware_1.authenticateUser, instractorController_1.registerInstructor);
router.post("/updateProfile/:userId", auth_middleware_1.authenticateUser, instractorController_1.updateProfile);
router.post("/updatePassword/:userId", auth_middleware_1.authenticateUser, instractorController_1.updatePassword);
router.get("/all", auth_middleware_1.authenticateUser, instractorController_1.getAllInstractor);
router.get("/:id", auth_middleware_1.authenticateUser, instractorController_1.getSingleInstractor);
exports.default = router;
