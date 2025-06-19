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
exports.fetchProgress = exports.getEnrolledStudentsforCourse = exports.fetchSingleCourse = exports.getAllCourses = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.courses.findMany({
        include: {
            department: true,
            instructor: true,
        },
    });
});
exports.getAllCourses = getAllCourses;
const fetchSingleCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.courses.findFirst({
        where: {
            id: id
        },
        include: {
            department: true,
            instructor: true,
            enrollments: true,
            Chapter: {
                include: {
                    lessons: true,
                },
            },
        },
    });
});
exports.fetchSingleCourse = fetchSingleCourse;
const getEnrolledStudentsforCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.courseEnrollment.findMany({
        where: {
            courseId: id
        },
        include: {
            student: {
                include: {
                    user: true,
                },
            }
        },
    });
});
exports.getEnrolledStudentsforCourse = getEnrolledStudentsforCourse;
const fetchProgress = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.courseProgress.findFirst({
        where: {
            studentId: userId,
            courseId: courseId
        }
    });
});
exports.fetchProgress = fetchProgress;
