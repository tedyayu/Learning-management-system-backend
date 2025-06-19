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
exports.updatePassword = exports.updateProfile = exports.searchStudents = exports.fetchAllStudents = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const student_1 = require("../services/student");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.fetchAllStudents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield (0, student_1.fetchStudents)();
        res.json(students);
    }
    catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ error: "An error occurred while fetching students" });
    }
}));
exports.searchStudents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const student = yield (0, student_1.searchStudent)(query);
        res.json(student);
    }
    catch (error) {
        console.error("Error searching student:", error);
        res.status(500).json({ error: "An error occurred while searching student" });
    }
}));
exports.updateProfile = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profilePhoto, firstName, lastName, email, language, phoneNumber } = req.body;
        const { id } = req.user;
        console.log("the req user from controller", id);
        yield (0, student_1.updateStudentProfile)(profilePhoto, firstName, lastName, email, language, phoneNumber, id);
        res.json({ message: "Student profile updated successfully" });
    }
    catch (error) {
        console.error("Error updating student profile:", error);
        res.status(500).json({ error: "An error occurred while updating student profile" });
    }
}));
exports.updatePassword = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword } = req.body;
        const student = yield (0, student_1.getUserById)(req.user.id);
        console.log(student === null || student === void 0 ? void 0 : student.password);
        if (!student || !student.password) {
            return res.status(401).json({ error: "The password you entered is not similar to your current password" });
        }
        const isCurrentPassword = yield bcryptjs_1.default.compare(currentPassword, student === null || student === void 0 ? void 0 : student.password);
        if (!isCurrentPassword)
            return res.status(401).json({ error: "Invalid credentials" });
        const newHashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        yield (0, student_1.updateStudentPassword)(newHashedPassword, req.user.id);
        res.json({ message: "Student password updated successfully" });
    }
    catch (error) {
        console.error("Error updating student password:", error);
        res.status(500).json({ error: "An error occurred while updating student password" });
    }
}));
