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
exports.updateTheLesson = exports.assignInstractor = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const assignInstractor = (courseId, instructorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructorExists = yield prismaInstance_1.default.instructor.findUnique({
            where: { id: instructorId },
        });
        if (!instructorExists) {
            throw new Error("Instructor not found");
        }
        const course = yield prismaInstance_1.default.courses.update({
            where: { id: courseId },
            data: {
                instructorId: instructorId,
            },
            include: {
                instructor: true,
                department: true,
            },
        });
        return course;
    }
    catch (error) {
        console.error("Error assigning instructor to course:", error);
        throw new Error("Error assigning instructor to course");
    }
});
exports.assignInstractor = assignInstractor;
const updateTheLesson = (lessonId, lessonData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const lesson = yield prismaInstance_1.default.lesson.update({
            where: { id: lessonId },
            data: {
                title: lessonData.name,
                content: lessonData.content,
                order: lessonData.order,
                duration: lessonData.duration,
                thumbnailUrl: lessonData.thumbnailUrl,
                tags: lessonData.tags,
                videoTitle: lessonData.video.title,
                videoDescription: lessonData.video.description,
                youtubeUrl: lessonData.video.url,
            }, include: {
                chapter: {
                    include: {
                        course: true,
                    },
                }
            }
        });
        return lesson;
    }
    catch (error) {
        console.error("Error updating lesson:", error);
        throw new Error("Could not update lesson");
    }
});
exports.updateTheLesson = updateTheLesson;
