"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controller/courseController");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post("/createCourse", auth_middleware_1.authenticateUser, courseController_1.createCourse);
router.get("/getCourses", courseController_1.getCourses);
router.get("/getSingleCourse/:courseId", auth_middleware_1.authenticateUser, courseController_1.getSingleCourse);
router.put("/assignInstractor/:courseId/:instractorId", auth_middleware_1.authenticateUser, courseController_1.assignInstractorForCourse);
router.post("/:courseId/createChapter", auth_middleware_1.authenticateUser, courseController_1.createChapter);
router.post("/:chapterId/createLesson", auth_middleware_1.authenticateUser, courseController_1.createLesson);
router.put("/updateLesson/:lessonId", auth_middleware_1.authenticateUser, courseController_1.updateLesson);
router.post("/enrollStudents", auth_middleware_1.authenticateUser, courseController_1.enrollStudents);
router.get("/:courseId/enrolledUsers", auth_middleware_1.authenticateUser, courseController_1.getEnrolledStudents);
router.post("/complete", auth_middleware_1.authenticateUser, courseController_1.courseComplete);
router.get("/progress/:userId/:courseId", auth_middleware_1.authenticateUser, courseController_1.fetchCourseProgress);
router.delete("/deleteChapter/:chapterId", auth_middleware_1.authenticateUser, courseController_1.deleteChapter);
router.delete("/deleteLesson/:lessonId", auth_middleware_1.authenticateUser, courseController_1.deleteLesson);
router.delete("/deleteCourse/:courseId", auth_middleware_1.authenticateUser, courseController_1.deleteCourse);
exports.default = router;
