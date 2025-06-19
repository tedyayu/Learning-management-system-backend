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
exports.markCompletedCourse = exports.createNewLesson = exports.createNewChapter = exports.enrollStudentsInCourse = exports.createNewCourse = void 0;
const prismaInstance_1 = __importDefault(require("../../utils/prismaInstance"));
const createNewCourse = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("the course data is", courseData);
        const departmentExists = yield prismaInstance_1.default.department.findUnique({
            where: { id: courseData.department },
        });
        if (!departmentExists) {
            throw new Error("Department not found");
        }
        const course = yield prismaInstance_1.default.courses.create({
            data: {
                courseImageurl: courseData.courseImage,
                name: courseData.courseName,
                description: courseData.shortDescription,
                code: courseData.courseCode,
                credits: Number(courseData.credits),
                departmentId: courseData.department,
                startDate: new Date(courseData.startDate),
                endDate: new Date(courseData.endDate),
                status: courseData.status,
                language: courseData.language,
                syllabus: courseData.syllabus,
                createdAt: new Date(courseData.createdDate),
                updatedAt: new Date(courseData.createdDate),
            }
        });
        return course;
    }
    catch (error) {
        console.error("Error deleting department:", error);
        throw new Error("Could not delete department");
    }
});
exports.createNewCourse = createNewCourse;
const enrollStudentsInCourse = (courseId, selectedStudents) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentIds = selectedStudents.map(student => student.id);
        const course = yield prismaInstance_1.default.courses.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new Error("Course not found");
        }
        // 1. Fetch already enrolled student IDs for this course
        const alreadyEnrolled = yield prismaInstance_1.default.courseEnrollment.findMany({
            where: {
                courseId,
                studentId: { in: studentIds }
            },
            select: { studentId: true }
        });
        const alreadyEnrolledIds = alreadyEnrolled.map(e => e.studentId);
        // 2. Filter out already enrolled students
        const newStudentIds = studentIds.filter(id => !alreadyEnrolledIds.includes(id));
        // 3. Fetch only the new students from the student table
        const students = yield prismaInstance_1.default.student.findMany({
            where: { userId: { in: newStudentIds } },
        });
        if (students.length !== newStudentIds.length) {
            throw new Error("Some students not found");
        }
        // 4. Enroll only new students
        let enrollments = null;
        if (newStudentIds.length > 0) {
            enrollments = yield prismaInstance_1.default.courseEnrollment.createMany({
                data: newStudentIds.map(studentId => ({
                    courseId,
                    studentId,
                })),
            });
        }
        // 5. Return info about already enrolled students
        return {
            enrolled: newStudentIds,
            alreadyEnrolled: alreadyEnrolledIds,
            enrollments
        };
    }
    catch (error) {
        console.error("Error enrolling students:", error);
        throw new Error("Could not enroll students in course");
    }
});
exports.enrollStudentsInCourse = enrollStudentsInCourse;
const createNewChapter = (courseId, chapterData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield prismaInstance_1.default.courses.findUnique({
            where: { id: courseId },
        });
        if (!course) {
            throw new Error("Course not found");
        }
        const chapter = yield prismaInstance_1.default.chapter.create({
            data: {
                title: chapterData.title,
                courseId: courseId,
            },
        });
        return chapter;
    }
    catch (error) {
        console.error("Error creating chapter:", error);
        throw new Error("Could not create chapter");
    }
});
exports.createNewChapter = createNewChapter;
const createNewLesson = (chapterId, lessonData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chapter = yield prismaInstance_1.default.chapter.findUnique({
            where: { id: chapterId },
        });
        if (!chapter) {
            throw new Error("Chapter not found");
        }
        const lesson = yield prismaInstance_1.default.lesson.create({
            data: {
                title: lessonData.name,
                description: lessonData.lessonDescription,
                content: lessonData.content,
                chapterId: chapterId,
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
        console.error("Error creating lesson:", error);
        throw new Error("Could not create lesson");
    }
});
exports.createNewLesson = createNewLesson;
const markCompletedCourse = (userId, lessonId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const lesson = yield prismaInstance_1.default.lesson.findUnique({
            where: { id: lessonId },
            include: { chapter: true },
        });
        const courseId = (_a = lesson === null || lesson === void 0 ? void 0 : lesson.chapter) === null || _a === void 0 ? void 0 : _a.courseId;
        if (!courseId) {
            throw new Error("Course ID not found for the lesson");
        }
        yield prismaInstance_1.default.lessonCompletion.upsert({
            where: {
                studentId_lessonId: {
                    studentId: userId,
                    lessonId,
                },
            },
            update: {},
            create: {
                studentId: userId,
                lessonId,
            },
        });
        const totalLessons = yield prismaInstance_1.default.lesson.count({
            where: {
                chapter: {
                    courseId: courseId,
                },
            },
        });
        const completedLessons = yield prismaInstance_1.default.lessonCompletion.count({
            where: {
                studentId: userId,
                lesson: {
                    chapter: {
                        courseId: courseId,
                    },
                },
            },
        });
        const progress = (completedLessons / totalLessons) * 100;
        const completed = completedLessons === totalLessons;
        yield prismaInstance_1.default.courseProgress.upsert({
            where: {
                studentId_courseId: {
                    studentId: userId,
                    courseId: courseId,
                },
            },
            update: {
                progress,
                completed,
            },
            create: {
                studentId: userId,
                courseId: courseId,
                progress,
                completed,
            },
        });
        return { progress, completed };
    }
    catch (error) {
        console.error("Error completing course:", error);
        throw new Error("Could not complete course");
    }
});
exports.markCompletedCourse = markCompletedCourse;
