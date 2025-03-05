import prisma from "../../utils/prismaInstance";


export const getInstractorByUserName=async(username:string) => {
    return await prisma.user.findFirst({
        where: {
            username: username
        }
        })
}