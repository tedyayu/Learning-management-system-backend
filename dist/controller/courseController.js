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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.deleteLesson = exports.deleteChapter = exports.fetchCourseProgress = exports.courseComplete = exports.updateLesson = exports.createLesson = exports.createChapter = exports.getEnrolledStudents = exports.enrollStudents = exports.assignInstractorForCourse = exports.getSingleCourse = exports.getCourses = exports.createCourse = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const course_1 = require("../services/course");
const course_2 = require("../services/course");
exports.createCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courseData = req.body;
    if (!courseData.courseName || !courseData.department) {
        return res.status(400).json({ error: "Course name or  department is required" });
    }
    try {
        const newCourse = yield (0, course_1.createNewCourse)(courseData);
        console.log("The created course is", newCourse);
        res.json(newCourse);
    }
    catch (error) {
        console.error("Error creating course:", error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
}));
exports.getCourses = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, course_1.getAllCourses)();
        res.json(courses);
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "An error occurred while fetching courses" });
    }
}));
exports.getSingleCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        console.log("The course id is", courseId);
        const course = yield (0, course_1.fetchSingleCourse)(courseId);
        console.log("The course is", course);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(course);
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "An error occurred while fetching the course" });
    }
}));
exports.assignInstractorForCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, instractorId } = req.params;
        const course = yield (0, course_1.fetchSingleCourse)(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const instractorAssignedCourse = yield (0, course_2.assignInstractor)(courseId, instractorId);
        console.log("The assigned course is", instractorAssignedCourse);
        if (!instractorAssignedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(instractorAssignedCourse);
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "An error occurred while fetching the course" });
    }
}));
exports.enrollStudents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectedStudents, courseId } = req.body;
        if (!courseId || !selectedStudents || selectedStudents.length === 0) {
            return res.status(400).json({ error: "Course ID and student IDs are required" });
        }
        const course = yield (0, course_1.fetchSingleCourse)(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const enrollmentResult = yield (0, course_1.enrollStudentsInCourse)(courseId, selectedStudents);
        res.json(enrollmentResult);
    }
    catch (error) {
        console.error("Error enrolling students:", error);
        res.status(500).json({ error: "An error occurred while enrolling students" });
    }
}));
exports.getEnrolledStudents = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }
        const course = yield (0, course_1.fetchSingleCourse)(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const enrolledStudents = yield (0, course_1.getEnrolledStudentsforCourse)(courseId);
        res.json(enrolledStudents);
    }
    catch (error) {
        console.error("Error fetching enrolled students:", error);
        res.status(500).json({ error: "An error occurred while fetching enrolled students" });
    }
}));
exports.createChapter = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        const chapterData = req.body;
        if (!courseId || !chapterData) {
            return res.status(400).json({ error: "Course ID and course data are required" });
        }
        const course = yield (0, course_1.fetchSingleCourse)(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const newChapter = yield (0, course_1.createNewChapter)(courseId, chapterData);
        res.json(newChapter);
    }
    catch (error) {
        console.error("Error creating chapter:", error);
        res.status(500).json({ error: "An error occurred while creating the chapter" });
    }
}));
exports.createLesson = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chapterId } = req.params;
        const lessonData = req.body;
        console.log("The lesson data is", lessonData);
        console.log("The chapter id is", chapterId);
        if (!chapterId || !lessonData) {
            return res.status(400).json({ error: "Chapter ID and lesson data are required" });
        }
        const chapter = yield (0, course_1.createNewLesson)(chapterId, lessonData);
        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.json(chapter);
    }
    catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ error: "An error occurred while creating the lesson" });
    }
}));
exports.updateLesson = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lessonId } = req.params;
        const lessonData = req.body;
        console.log("The lesson data is", lessonData);
        console.log("The lesson id is", lessonId);
        if (!lessonId || !lessonData) {
            return res.status(400).json({ error: "Lesson ID and lesson data are required" });
        }
        const chapter = yield (0, course_1.updateTheLesson)(lessonId, lessonData);
        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.json(chapter);
    }
    catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ error: "An error occurred while creating the lesson" });
    }
}));
exports.courseComplete = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, lessonId } = req.body;
        console.log("The user id is", userId);
        console.log("The lesson id is", lessonId);
        if (!lessonId) {
            return res.status(400).json({ error: "Lesson ID is required" });
        }
        const Progress = yield (0, course_1.markCompletedCourse)(userId, lessonId);
        console.log("The progress is", Progress);
        res.json({ message: "Lesson marked as complete", Progress });
    }
    catch (error) {
        console.error("Error completing course:", error);
        res.status(500).json({ error: "An error occurred while completing the course" });
    }
}));
exports.fetchCourseProgress = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "User ID and Course ID are required" });
        }
        const progress = yield (0, course_1.fetchProgress)(userId, courseId);
        if (!progress) {
            return res.status(404).json({ error: "Progress not found" });
        }
        res.json(progress);
    }
    catch (error) {
        console.error("Error fetching course progress:", error);
        res.status(500).json({ error: "An error occurred while fetching course progress" });
    }
}));
exports.deleteChapter = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { chapterId } = req.params;
        if (!chapterId) {
            return res.status(400).json({ error: "Chapter ID is required" });
        }
        const deletedChapter = yield (0, course_1.deleteTheChapter)(chapterId);
        if (!deletedChapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.json({ message: "Chapter deleted successfully", deletedChapter });
    }
    catch (error) {
        console.error("Error deleting chapter:", error);
        res.status(500).json({ error: "An error occurred while deleting the chapter" });
    }
}));
exports.deleteLesson = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lessonId } = req.params;
        if (!lessonId) {
            return res.status(400).json({ error: "Lesson ID is required" });
        }
        const deletedLesson = yield (0, course_1.deleteTheLesson)(lessonId);
        if (!deletedLesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json({ message: "Lesson deleted successfully", deletedLesson });
    }
    catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ error: "An error occurred while deleting the lesson" });
    }
}));
exports.deleteCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }
        const deletedCourse = yield (0, course_1.deleteTheCourse)(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ message: "Course deleted successfully", deletedCourse });
    }
    catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "An error occurred while deleting the course" });
    }
}));
