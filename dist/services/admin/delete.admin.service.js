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
exports.deleteAnnouncement = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const deleteAnnouncement = (announcementId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAnnouncement = yield prismaInstance_1.default.adminAnnouncement.delete({
            where: {
                id: announcementId,
            },
        });
        return deletedAnnouncement;
    }
    catch (error) {
        console.error("Error deleting announcement:", error);
        throw new Error("Could not delete announcement");
    }
});
exports.deleteAnnouncement = deleteAnnouncement;
