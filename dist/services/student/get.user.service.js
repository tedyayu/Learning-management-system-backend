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
exports.searchStudent = exports.fetchStudents = exports.getUserById = exports.getStudentById = exports.getStudentByEmail = exports.getStudentByUserName = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const getStudentByUserName = (username) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            username: username
        },
        include: {
            student: {
                include: { CourseEnrollments: {
                        include: {
                            course: {
                                include: {
                                    Chapter: {
                                        include: {
                                            lessons: true
                                        }
                                    },
                                    department: true,
                                }
                            }
                        }
                    } }
            },
            instructor: {
                include: { Courses: {
                        include: {
                            department: true,
                            enrollments: true,
                            Chapter: {
                                include: {
                                    lessons: true
                                }
                            }
                        }
                    } }
            }
        }
    });
});
exports.getStudentByUserName = getStudentByUserName;
const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            email: email
        }
    });
});
exports.getStudentByEmail = getStudentByEmail;
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            id: id
        }
    });
});
exports.getStudentById = getStudentById;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            id: id
        }
    });
});
exports.getUserById = getUserById;
const fetchStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findMany({
        where: {
            role: "STUDENT"
        },
        include: {
            student: true
        }
    });
});
exports.fetchStudents = fetchStudents;
const searchStudent = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaInstance_1.default.user.findFirst({
        where: {
            OR: [
                {
                    username: {
                        contains: query
                    }
                },
                {
                    email: {
                        contains: query
                    }
                }
            ],
            role: "STUDENT"
        },
        include: {
            student: true
        }
    });
});
exports.searchStudent = searchStudent;
