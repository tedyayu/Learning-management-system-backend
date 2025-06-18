import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createNewCourse ,
     getAllCourses, 
     fetchSingleCourse,
     enrollStudentsInCourse,
      getEnrolledStudentsforCourse, 
      createNewChapter, 
      createNewLesson,
      updateTheLesson, 
      markCompletedCourse,
       fetchProgress,
       deleteTheChapter,deleteTheLesson, deleteTheCourse} from "../services/course";
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
        const course = await fetchSingleCourse(courseId);
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

export const enrollStudents = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { selectedStudents, courseId } = req.body;
        if (!courseId || !selectedStudents || selectedStudents.length === 0) {
            return res.status(400).json({ error: "Course ID and student IDs are required" });
        }
        const course = await fetchSingleCourse(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const enrollmentResult = await enrollStudentsInCourse(courseId, selectedStudents);
        res.json(enrollmentResult);
    } catch (error) {
        console.error("Error enrolling students:", error);
        res.status(500).json({ error: "An error occurred while enrolling students" });
    }
}
);

export const getEnrolledStudents = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }
        const course = await fetchSingleCourse(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const enrolledStudents = await getEnrolledStudentsforCourse(courseId);
        res.json(enrolledStudents);
    } catch (error) {
        console.error("Error fetching enrolled students:", error);
        res.status(500).json({ error: "An error occurred while fetching enrolled students" });
    }
}
);

export const createChapter = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        const chapterData  = req.body;
        if (!courseId || !chapterData) {
            return res.status(400).json({ error: "Course ID and course data are required" });
        }
        const course = await fetchSingleCourse(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        const newChapter = await createNewChapter(courseId, chapterData);
        res.json(newChapter);
    } catch (error) {
        console.error("Error creating chapter:", error);
        res.status(500).json({ error: "An error occurred while creating the chapter" });
    }
}
);

export const createLesson = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { chapterId } = req.params;
        const lessonData  = req.body;

        console.log("The lesson data is", lessonData);
        console.log("The chapter id is", chapterId);
        
        if (!chapterId || !lessonData) {
            return res.status(400).json({ error: "Chapter ID and lesson data are required" });
        }
        const chapter = await createNewLesson(chapterId, lessonData);
        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.json(chapter);
    } catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ error: "An error occurred while creating the lesson" });
    }
}
);

export const updateLesson = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { lessonId } = req.params;
        const lessonData  = req.body;

        console.log("The lesson data is", lessonData);
        console.log("The lesson id is", lessonId);
        
        if (!lessonId || !lessonData) {
            return res.status(400).json({ error: "Lesson ID and lesson data are required" });
        }
        const chapter = await updateTheLesson(lessonId, lessonData);
        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.json(chapter);
    } catch (error) {
        console.error("Error creating lesson:", error);
        res.status(500).json({ error: "An error occurred while creating the lesson" });
    }
}
);

export const courseComplete = asyncHandler(async (req: Request, res: Response) => {
    try {
        const {  userId, lessonId } = req.body;
        console.log("The user id is", userId);
        console.log("The lesson id is", lessonId);
        if (!lessonId) {
            return res.status(400).json({ error: "Lesson ID is required" });
        }
        const Progress=await markCompletedCourse(userId, lessonId);
        console.log("The progress is", Progress);
        res.json({ message: "Lesson marked as complete", Progress });
    } catch (error) {
        console.error("Error completing course:", error);
        res.status(500).json({ error: "An error occurred while completing the course" });
    }
}
);

export const fetchCourseProgress = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "User ID and Course ID are required" });
        }
        const progress = await fetchProgress(userId, courseId);
        if (!progress) {
            return res.status(404).json({ error: "Progress not found" });
        }
        res.json(progress);
    } catch (error) {
        console.error("Error fetching course progress:", error);
        res.status(500).json({ error: "An error occurred while fetching course progress" });
    }
}
);

export const deleteChapter = asyncHandler(async (req: Request, res: Response) => {  
    try {
        const { chapterId } = req.params;
        if (!chapterId) {
            return res.status(400).json({ error: "Chapter ID is required" });
        }
        const deletedChapter = await deleteTheChapter(chapterId);
        if (!deletedChapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.json({ message: "Chapter deleted successfully", deletedChapter });
    } catch (error) {
        console.error("Error deleting chapter:", error);
        res.status(500).json({ error: "An error occurred while deleting the chapter" });
    }
}
);

export const deleteLesson = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { lessonId } = req.params;
        if (!lessonId) {
            return res.status(400).json({ error: "Lesson ID is required" });
        }
        const deletedLesson = await deleteTheLesson(lessonId);
        if (!deletedLesson) {
            return res.status(404).json({ error: "Lesson not found" });
        }
        res.json({ message: "Lesson deleted successfully", deletedLesson });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        res.status(500).json({ error: "An error occurred while deleting the lesson" });
    }
}
);

export const deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ error: "Course ID is required" });
        }
        const deletedCourse = await deleteTheCourse(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.json({ message: "Course deleted successfully", deletedCourse });
    } catch (error) {
        console.error("Error deleting course:", error);
        res.status(500).json({ error: "An error occurred while deleting the course" });
    }
}
);