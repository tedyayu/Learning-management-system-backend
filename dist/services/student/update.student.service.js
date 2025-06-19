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
exports.updateStudentPassword = exports.updateStudentProfile = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const updateStudentProfile = (profilePhoto, firstName, lastName, email, language, phoneNumber, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.default.user.update({
            where: {
                id: id
            },
            data: {
                email: email,
                username: firstName
            }
        });
        yield prismaInstance_1.default.student.update({
            where: {
                userId: id
            },
            data: {
                profilePhotoURL: profilePhoto,
                firstName: firstName,
                lastName: lastName,
                language: language,
                phone: phoneNumber
            }
        });
    }
    catch (error) {
        console.error("Error updating student profile:", error);
        throw new Error("Could not update student profile");
    }
});
exports.updateStudentProfile = updateStudentProfile;
const updateStudentPassword = (newPassword, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.default.user.update({
            where: {
                id: id
            },
            data: {
                password: newPassword
            }
        });
    }
    catch (error) {
        console.error("Error updating student password:", error);
        throw new Error("Could not update student password");
    }
});
exports.updateStudentPassword = updateStudentPassword;
