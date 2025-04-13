import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createNewCourse , getAllCourses, fetchSingleCourse} from "../services/course";
import { assignInstractor } from "../services/course";
import ConflictError from "../errors/conflict.error";


export const createCourse = asyncHandler(async (req: Request, res: Response) => {
    const courseData= req.body;
    if (!courseData.courseName || !courseData.department) {
        return res.status(400).json({ error: "Course name or  department is required" });
    }

    try {
        const newCourse = await createNewCourse(courseData);
        console.log("The created course is", newCourse);
        res.json(newCourse);
    } catch (error) {
        console.error("Error creating course:", error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
    
});

export const getCourses = asyncHandler(async (req: Request, res: Response) => {
    try {
        const courses = await getAllCourses();
        res.json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "An error occurred while fetching courses" });
    }
}
);

export const getSingleCourse = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        console.log("The course id is", courseId);
        const course = await fetchSingleCourse(courseId);
        console.log("The course is", course);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "An error occurred while fetching the course" });
    }
}
);

export const assignInstractorForCourse = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { courseId, instractorId } = req.params;
        console.log("The course id is", courseId);
        console.log("The instractor id is", instractorId);
        const course = await fetchSingleCourse(courseId);
        console.log("The course is", course);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const instractorAssignedCourse= await assignInstractor(courseId,instractorId);
        console.log("The assigned course is", instractorAssignedCourse);
        if (!instractorAssignedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json(instractorAssignedCourse);

    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "An error occurred while fetching the course" });
    }
}
);