import prisma from "../../utils/prismaInstance";


export const getInstractorByUserName=async(username:string) => {
    return await prisma.user.findFirst({
        where: {
            username: username
        }
        })
}

export const getInstractorsAll=async()=>{
    return await prisma.instructor.findMany({
        include: {
            user: true, // Include related user data if needed
        },
    });
}