"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateProfile = exports.getSingleInstractor = exports.getAllInstractor = exports.registerInstructor = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const instractor_1 = require("../services/instractor");
const instractor_2 = require("../services/instractor");
const conflict_error_1 = __importDefault(require("../errors/conflict.error"));
exports.registerInstructor = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, instructorId, email } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield (0, instractor_2.getInstractorByUserName)(username);
    if (user)
        throw new conflict_error_1.default("User already exists");
    const newInstructor = yield (0, instractor_1.createInstructor)({
        username,
        password: hashedPassword,
        instructorId,
        email
    });
    console.log(newInstructor);
    res.json(newInstructor);
}));
exports.getAllInstractor = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instractors = yield (0, instractor_2.getInstractorsAll)();
        res.json(instractors);
    }
    catch (error) {
        console.error("Error fetching instractor:", error);
        res.status(500).json({ error: "An error occurred while fetching instractors" });
    }
}));
exports.getSingleInstractor = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const instractor = yield (0, instractor_2.getInstractorByUserID)(id);
        if (!instractor) {
            return res.status(404).json({ error: "Instructor not found" });
        }
        res.json(instractor);
    }
    catch (error) {
        console.error("Error fetching instructor:", error);
        res.status(500).json({ error: "An error occurred while fetching the instructor" });
    }
}));
exports.updateProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePhoto, firstName, lastName, email, language, phoneNumber, bio, expertise, linkedin, twitter } = req.body;
        const { userId } = req.params;
        yield (0, instractor_2.updateInstractorProfile)(profilePhoto, firstName, lastName, email, language, phoneNumber, bio, expertise, linkedin, twitter, userId);
        res.json({ message: "Student profile updated successfully" });
    }
    catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ error: "An error occurred while updating student profile" });
    }
}));
exports.updatePassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { currentPassword, newPassword } = req.body;
        const { userId } = req.params;
        const instractor = yield (0, instractor_2.getInstractorByUserID)(userId);
        if (!instractor) {
            return res.status(401).json({ error: "The password you entered is not similar to your current password" });
        }
        if (!((_a = instractor.user) === null || _a === void 0 ? void 0 : _a.password)) {
            return res.status(401).json({ error: "The password you entered is not similar to your current password" });
        }
        const isCurrentPassword = yield bcryptjs_1.default.compare(currentPassword, instractor.user.password);
        if (!isCurrentPassword)
            return res.status(401).json({ error: "Invalid credentials" });
        const newHashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield (0, instractor_2.updateInstractorPassword)(newHashedPassword, userId);
        res.json({ message: "Student password updated successfully" });
    }
    catch (error) {
        console.error("Error updating student password:", error);
        res.status(500).json({ error: "An error occurred while updating student password" });
    }
}));
