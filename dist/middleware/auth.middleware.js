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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const student_1 = require("../services/student");
const instractor_1 = require("../services/instractor");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        console.log("Token from cookies:", token);
        if (!token) {
            res.status(401).json({ error: "User needs to be authenticated" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token:", decoded);
        const adminUsername = process.env.ADMIN_USERNAME;
        let user;
        if (decoded.role === "STUDENT" && decoded.id) {
            user = yield (0, student_1.getStudentById)(decoded.id);
        }
        else if (decoded.role === "INSTRUCTOR" && decoded.id) {
            user = yield (0, instractor_1.getInstractorById)(decoded.id);
        }
        else if (decoded.role === "ADMIN" && decoded.username === adminUsername) {
            user = {
                username: adminUsername,
                role: "ADMIN",
            };
        }
        if (!user) {
            res.status(401).json({ error: "User is not authenticated" });
            return;
        }
        req.user = user;
        console.log("Authenticated user:", req.user);
        next();
    }
    catch (error) {
        console.error("Error authenticating user:", error);
        res.status(500).json({ error: "An error occurred while authenticating user" });
    }
});
exports.authenticateUser = authenticateUser;
