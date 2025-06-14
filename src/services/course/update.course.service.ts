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

export const updateTheLesson = async (lessonId: string, lessonData: any) => {
    try {
        const lesson = await prisma.lesson.update({
            where: { id: lessonId },
            data: {
                title: lessonData.name,
                content: lessonData.content,
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
            }
        })
        return lesson;
    } catch (error) {
        console.error("Error updating lesson:", error);
        throw new Error("Could not update lesson");
    }
}