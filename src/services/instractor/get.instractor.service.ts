import prisma from "../../utils/prismaInstance";


export const getInstractorByUserName=async(username:string) => {
    return await prisma.user.findFirst({
        where: {
            username: username
        },
        include: {
            instructor: true, 
        },
        })
}

export const getInstractorsAll=async()=>{
    return await prisma.instructor.findMany({
        include: {
            user: true, // Include related user data if needed
        },
    });
}

export const getInstractorByUserID=async (id:string)=>{
    return await prisma.instructor.findFirst({
        where: {
            userId: id
        },
        include: {
            user: true, 
            Courses: true,
        },
    })
}

export const getInstractorById=async(id:string) => {
    return await prisma.user.findFirst({
        where: {
            id: id
        }
        })
}
