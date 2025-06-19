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
exports.deleteSelectedAnnouncement = exports.updateAnnouncement = exports.getAnnouncements = exports.submitAnnouncement = exports.logOutUser = exports.loginUser = exports.registerStudent = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const student_1 = require("../services/student");
const student_2 = require("../services/student");
const admin_1 = require("../services/admin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = require("../utils/asyncHandler");
const conflict_error_1 = __importDefault(require("../errors/conflict.error"));
exports.registerStudent = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, studentId, email, department } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield (0, student_2.getStudentByUserName)(username);
    if (user)
        throw new conflict_error_1.default("User already exists");
    const newStudent = (0, student_1.createStudent)({
        username,
        password: hashedPassword,
        studentId,
        email,
        department
    });
    res.json(newStudent);
}));
exports.loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    try {
        if (username === adminUsername && password === adminPassword) {
            const token = jsonwebtoken_1.default.sign({ username, role: 'ADMIN' }, secret, { expiresIn: "1h" });
            console.log("Admin token:", token);
            res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
            res.json({ message: "Login successful", username, role: "ADMIN" });
            return;
        }
        const user = yield (0, student_2.getStudentByUserName)(username);
        console.log(user);
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials - User not found" });
        }
        if (!user.password) {
            return res.status(500).json({ error: "User password not set in database" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid credentials - Password mismatch" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, secret, { expiresIn: "1h" });
        console.log(token, user);
        res.cookie("token", token, { httpOnly: true, secure: false, sameSite: "strict" });
        res.json({ user });
    }
    catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
}));
exports.logOutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("cookies", req.cookies);
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        secure: false,
        sameSite: 'strict'
    });
    res.status(200).json({ message: "Logged out successfully" });
}));
exports.submitAnnouncement = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { announcement } = req.body;
    if (!announcement.title || !announcement.message) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    yield (0, admin_1.addAnnouncement)(announcement);
    console.log("Announcement submitted:", announcement);
    res.status(201).json({ message: "Announcement submitted successfully" });
}));
exports.getAnnouncements = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const announcements = yield (0, admin_1.getAllAnnouncements)();
        console.log("Fetched announcements:", announcements);
        res.json(announcements);
    }
    catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ error: "An error occurred while fetching announcements" });
    }
}));
exports.updateAnnouncement = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, message } = req.body;
    if (!title || !message) {
        return res.status(400).json({ error: "Title and message are required" });
    }
    try {
        const updatedAnnouncement = yield (0, admin_1.EditAnnouncement)(id, { title, message });
        res.json(updatedAnnouncement);
    }
    catch (error) {
        console.error("Error updating announcement:", error);
        res.status(500).json({ error: "An error occurred while updating the announcement" });
    }
}));
exports.deleteSelectedAnnouncement = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, admin_1.deleteAnnouncement)(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting announcement:", error);
        res.status(500).json({ error: "An error occurred while deleting the announcement" });
    }
}));
