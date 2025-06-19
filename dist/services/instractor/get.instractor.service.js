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
exports.getInstractorById = exports.getInstractorByUserID = exports.getInstractorsAll = exports.getInstractorByUserName = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const getInstractorByUserName = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            username: username
        },
        include: {
            instructor: true,
        },
    });
});
exports.getInstractorByUserName = getInstractorByUserName;
const getInstractorsAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.instructor.findMany({
        include: {
            user: true, // Include related user data if needed
        },
    });
});
exports.getInstractorsAll = getInstractorsAll;
const getInstractorByUserID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.instructor.findFirst({
        where: {
            userId: id
        },
        include: {
            user: true,
            Courses: true,
        },
    });
});
exports.getInstractorByUserID = getInstractorByUserID;
const getInstractorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            id: id
        }
    });
});
exports.getInstractorById = getInstractorById;
