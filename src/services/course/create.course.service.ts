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