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
exports.getDepartmentById = exports.getDepartmentByname = exports.getAllDepartments = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const getAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.department.findMany({ include: { courses: {
                include: { Chapter: {
                        include: { lessons: true }
                    }, instructor: { include: { user: true } } }
            } } });
});
exports.getAllDepartments = getAllDepartments;
const getDepartmentByname = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.department.findFirst({
        where: {
            name: name
        }
    });
});
exports.getDepartmentByname = getDepartmentByname;
const getDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.department.findFirst({
        where: {
            id: id
        }
    });
});
exports.getDepartmentById = getDepartmentById;
