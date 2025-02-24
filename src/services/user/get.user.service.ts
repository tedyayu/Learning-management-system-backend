import prisma from "../../utils/prismaInstance";


export const getStudentByUserName=async(username:string) => {
    return await prisma.student.findFirst({
        where: {
            firstName: username
        }
        })
}