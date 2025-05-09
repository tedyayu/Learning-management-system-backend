import express from 'express';
import { createCourse , assignInstractorForCourse,getCourses,getSingleCourse, enrollStudents,getEnrolledStudents,createChapter} from '../controller/courseController';

const router=express.Router();

router.post("/createCourse",createCourse);
router.get("/getCourses", getCourses);
router.get("/getSingleCourse/:courseId", getSingleCourse);
router.put("/assignInstractor/:courseId/:instractorId", assignInstractorForCourse);
router.post("/:courseId/createChapter", createChapter);
router.post("/enrollStudents",enrollStudents);
router.get("/:courseId/enrolledUsers", getEnrolledStudents);

export default router;