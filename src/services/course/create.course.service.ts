import prisma from "../../utils/prismaInstance";

interface CourseData {
    courseImage: string;
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
                courseImageurl: courseData.courseImage,
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

        // 1. Fetch already enrolled student IDs for this course
        const alreadyEnrolled = await prisma.courseEnrollment.findMany({
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
        const students = await prisma.student.findMany({
            where: { userId: { in: newStudentIds } },
        });

        if (students.length !== newStudentIds.length) {
            throw new Error("Some students not found");
        }

        // 4. Enroll only new students
        let enrollments = null;
        if (newStudentIds.length > 0) {
            enrollments = await prisma.courseEnrollment.createMany({
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
    lessonDescription: string;
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
        }})

        return lesson;
    } catch (error) {
        console.error("Error creating lesson:", error);
        throw new Error("Could not create lesson");
    }
}

export const markCompletedCourse= async (userId: string, lessonId: string) => {
    try{
        const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { chapter: true },
        });

        const courseId  = lesson?.chapter?.courseId;

        if (!courseId) {
            throw new Error("Course ID not found for the lesson");
        }

        await prisma.lessonCompletion.upsert({
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

        const totalLessons = await prisma.lesson.count({
            where: {
            chapter: {
                courseId: courseId,
            },
            },
        });

        const completedLessons = await prisma.lessonCompletion.count({
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

        await prisma.courseProgress.upsert({
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
    }catch (error) {
        console.error("Error completing course:", error);
        throw new Error("Could not complete course");
    }

}
