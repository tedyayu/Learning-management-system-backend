import prisma from "../../utils/prismaInstance";

export const getAllCourses=async()=>{
    return await prisma.courses.findMany({
        include: {
            department: true,
            instructor: true,
        },
    });
}

export const fetchSingleCourse=async (id:string)=>{
    return await prisma.courses.findFirst({
        where: {
            id: id
        },
        include: {
            department: true,
            instructor: true,
            Chapter: {
                include: {
                    lessons: true,
                },
            },
        },
    });
}

export const getEnrolledStudentsforCourse=async (id:string)=>{
    return await prisma.courseEnrollment.findMany({
        where: {
            courseId: id
        },
        include: {
            student:{
                include: {
                    user: true,
                },  
            }
        },
    })
};