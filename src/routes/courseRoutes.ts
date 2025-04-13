import express from 'express';
import { createCourse , assignInstractorForCourse} from '../controller/courseController';
import { getCourses,getSingleCourse } from '../controller/courseController';

const router=express.Router();

router.post("/createCourse",createCourse);
router.get("/getCourses", getCourses);
router.get("/getSingleCourse/:courseId", getSingleCourse);
router.put("/assignInstractor/:courseId/:instractorId", assignInstractorForCourse)

export default router;