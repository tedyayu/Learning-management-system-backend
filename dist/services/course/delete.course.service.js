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
exports.deleteTheCourse = exports.deleteTheLesson = exports.deleteTheChapter = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const deleteTheChapter = (chapterId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedChapter = yield prismaInstance_1.default.chapter.delete({
        where: {
            id: chapterId,
        },
        include: {
            lessons: true
        }
    });
    return deletedChapter;
});
exports.deleteTheChapter = deleteTheChapter;
const deleteTheLesson = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedLesson = yield prismaInstance_1.default.lesson.delete({
        where: {
            id: lessonId,
        },
    });
    return deletedLesson;
});
exports.deleteTheLesson = deleteTheLesson;
const deleteTheCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCourse = yield prismaInstance_1.default.courses.delete({
        where: {
            id: courseId,
        },
        include: {
            Chapter: {
                include: {
                    lessons: true,
                }
            },
            instructor: true,
            department: true,
        },
    });
    return deletedCourse;
});
exports.deleteTheCourse = deleteTheCourse;
