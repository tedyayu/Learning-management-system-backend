import prisma from "../../utils/prismaInstance";

export const assignInstractor = async (courseId: string, instructorId: string) => {
    try {

        const instructorExists = await prisma.instructor.findUnique({
            where: { id: instructorId },
        });
       
        if (!instructorExists) {
            throw new Error("Instructor not found");
        }
        const course = await prisma.courses.update({
            where: { id: courseId },
            data: {
                instructorId: instructorId,
            },
            include: {
                instructor: true,
                department: true,
            },
        });
        return course;
    } catch (error) {
        console.error("Error assigning instructor to course:", error);
        throw new Error("Error assigning instructor to course");
    }
}