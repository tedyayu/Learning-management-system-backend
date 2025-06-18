import prisma from "../../utils/prismaInstance";

export const deleteTheChapter= async ( chapterId: string) => {
    const deletedChapter = await prisma.chapter.delete({
        where: {
            id: chapterId,
        
        },
        include:{
            lessons:true
        }
    });

    return deletedChapter;
}

export const deleteTheLesson = async (lessonId: string) => {
    const deletedLesson = await prisma.lesson.delete({
        where: {
            id: lessonId,
        },
    });
    return deletedLesson;
};

export const deleteTheCourse = async (courseId: string) => {
    const deletedCourse = await prisma.courses.delete({
        where: {
            id: courseId,
        },
        include: {
            Chapter: {
                include: {
                    lessons: true,
                }
            },
            instructor: true,
            department: true,
        },
    });
    return deletedCourse;
};