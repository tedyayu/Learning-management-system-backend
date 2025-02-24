import prisma from "../../utils/prismaInstance";


interface CreateUserData {
    username: string;
    password: string;
    ID_NO: string;
}


export const  createStudent = async(data:CreateUserData) => {
    try {
        const student=await prisma.student.create({
            data:{
               ...data
            }
        })
        return student;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Could not register user");
    }
    
}