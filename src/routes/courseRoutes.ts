import express from 'express';
import { createCourse , assignInstractorForCourse,getCourses,getSingleCourse, enrollStudents,getEnrolledStudents,createChapter,createLesson, updateLesson , courseComplete, fetchCourseProgress,deleteChapter,deleteLesson,deleteCourse} from '../controller/courseController';

const router=express.Router();

router.post("/createCourse",createCourse);
router.get("/getCourses", getCourses);
router.get("/getSingleCourse/:courseId", getSingleCourse);
router.put("/assignInstractor/:courseId/:instractorId", assignInstractorForCourse);
router.post("/:courseId/createChapter", createChapter);
router.post("/:chapterId/createLesson", createLesson);
router.put("/updateLesson/:lessonId", updateLesson)
router.post("/enrollStudents",enrollStudents);
router.get("/:courseId/enrolledUsers", getEnrolledStudents);
router.post("/complete", courseComplete);
router.get("/progress/:userId/:courseId", fetchCourseProgress);
router.delete("/deleteChapter/:chapterId", deleteChapter);
router.delete("/deleteLesson/:lessonId", deleteLesson);
router.delete("/deleteCourse/:courseId", deleteCourse)

export default router;