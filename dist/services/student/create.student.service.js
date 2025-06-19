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
exports.createStudent = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const createStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prismaInstance_1.default.user.create({
            data: {
                username: data.username,
                password: data.password,
                email: data.email,
                role: "STUDENT",
            }
        });
        const student = yield prismaInstance_1.default.student.create({
            data: {
                firstName: data.username,
                studentId: data.studentId,
                department: data.department,
                user: {
                    connect: {
                        id: user.id
                    }
                }
            }
        });
        return { user, student };
    }
    catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Could not register user");
    }
});
exports.createStudent = createStudent;
