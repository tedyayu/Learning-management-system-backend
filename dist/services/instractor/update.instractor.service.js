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
exports.updateInstractorPassword = exports.updateInstractorProfile = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const updateInstractorProfile = (profilePhoto, firstName, lastName, email, language, phoneNumber, bio, expertise, linkedin, twitter, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.default.user.update({
            where: {
                id: userId
            },
            data: {
                email: email,
                username: firstName
            }
        });
        yield prismaInstance_1.default.instructor.update({
            where: {
                userId: userId
            },
            data: {
                profilePhotoURL: profilePhoto,
                firstName: firstName,
                lastName: lastName,
                language: language,
                phone: phoneNumber,
                bio: bio,
                expertise: expertise,
                linkedin: linkedin,
                twitter: twitter
            }
        });
    }
    catch (error) {
        console.error("Error updating student profile:", error);
        throw new Error("Could not update student profile");
    }
});
exports.updateInstractorProfile = updateInstractorProfile;
const updateInstractorPassword = (newPassword, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prismaInstance_1.default.user.update({
            where: {
                id: userId
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
exports.updateInstractorPassword = updateInstractorPassword;
