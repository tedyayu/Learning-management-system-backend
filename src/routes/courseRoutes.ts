import express from 'express';
import { createCourse , assignInstractorForCourse,getCourses,getSingleCourse, enrollStudents,getEnrolledStudents,createChapter,createLesson, updateLesson , courseComplete, fetchCourseProgress,deleteChapter,deleteLesson,deleteCourse} from '../controller/courseController';
import {authenticateUser} from "../middleware/auth.middleware"

const router=express.Router();

router.post("/createCourse",authenticateUser,createCourse);
router.get("/getCourses", getCourses);
router.get("/getSingleCourse/:courseId",authenticateUser, getSingleCourse);
router.put("/assignInstractor/:courseId/:instractorId",authenticateUser, assignInstractorForCourse);
router.post("/:courseId/createChapter",authenticateUser, createChapter);
router.post("/:chapterId/createLesson",authenticateUser, createLesson);
router.put("/updateLesson/:lessonId",authenticateUser, updateLesson)
router.post("/enrollStudents",authenticateUser,enrollStudents);
router.get("/:courseId/enrolledUsers",authenticateUser, getEnrolledStudents);
router.post("/complete",authenticateUser, courseComplete);
router.get("/progress/:userId/:courseId",authenticateUser, fetchCourseProgress);
router.delete("/deleteChapter/:chapterId",authenticateUser, deleteChapter);
router.delete("/deleteLesson/:lessonId",authenticateUser, deleteLesson);
router.delete("/deleteCourse/:courseId",authenticateUser, deleteCourse);

export default router;