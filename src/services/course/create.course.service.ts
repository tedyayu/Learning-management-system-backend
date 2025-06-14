import prisma from "../../utils/prismaInstance";

interface CourseData {
    courseName: string;
    shortDescription: string;
    credits: number;
    department: string;
    courseCode: string;
    status: string;
    createdBy: string;
    createdDate: Date;
    language: string;
    access: string;
    image: string;
    syllabus: string;
    startDate: Date;
    endDate: Date;
    price: number;
}
export const createNewCourse = async (courseData: CourseData) => {
    try {
        console.log("the course data is", courseData);

        const departmentExists = await prisma.department.findUnique({
            where: { id: courseData.department },
        });

        if (!departmentExists) {
            throw new Error("Department not found");
        }
        const course = await prisma.courses.create({
            data: {
                name: courseData.courseName,
                description: courseData.shortDescription,
                code: courseData.courseCode,
                credits:Number( courseData.credits),
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
       
    } catch (error) {
        console.error("Error deleting department:", error);
        throw new Error("Could not delete department"); 
    }
}

export const enrollStudentsInCourse = async (courseId: string, selectedStudents: { id: string }[]) => {
    try {
        const studentIds = selectedStudents.map(student => student.id);

        const course = await prisma.courses.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new Error("Course not found");
        }

        const students = await prisma.student.findMany({
            where: { userId: { in: studentIds } },
        });

        console.log(`the students length is ${students.length} the student ids length is ${studentIds.length}`);

        if (students.length !== studentIds.length) {
            throw new Error("Some students not found");
        }

        const enrollments = await prisma.courseEnrollment.createMany({
            data: studentIds.map(studentId => ({
                courseId,
                studentId,
            })),
        });

        return enrollments;
    } catch (error) {
        console.error("Error enrolling students:", error);
        throw new Error("Could not enroll students in course");
    }
}

 

export const createNewChapter = async (courseId: string, chapterData: {title : string}) => {
    try {
        const course = await prisma.courses.findUnique({
            where: { id: courseId },
        });

        if (!course) {
            throw new Error("Course not found");
        }

        const chapter = await prisma.chapter.create({
            data: {
                title: chapterData.title,
                courseId: courseId,
            },
        });

        return chapter;
    } catch (error) {
        console.error("Error creating chapter:", error);
        throw new Error("Could not create chapter");
    }
}
interface video {
    title: string;
    description: string;
    url: string;
}
interface lessonData {
    name : string;
    content:string;
    order: number;
    duration: string;
    thumbnailUrl: string;
    tags: string[];
    video:video
}



export const createNewLesson = async (chapterId: string, lessonData: lessonData) => {
    try {
        const chapter = await prisma.chapter.findUnique({
            where: { id: chapterId },
        });

        if (!chapter) {
            throw new Error("Chapter not found");
        }

        const lesson = await prisma.lesson.create({
            data: {
                title: lessonData.name,
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
        }})

        return lesson;
    } catch (error) {
        console.error("Error creating lesson:", error);
        throw new Error("Could not create lesson");
    }
}
