import prisma from "../../utils/prismaInstance";


interface CreateUserData {
    username: string;
    password: string;
    ID_NO: string;
    email: string;
}


export const  createStudent = async(data:CreateUserData) => {
   try {
    const user=await prisma.user.create({
        data:{
            username:data.username,
            password:data.password,
            email:data.email,
            role:"STUDENT",
        }       
    });
    const student=await prisma.student.create({
        data:{
            firstName:data.username,
            studentId:data.ID_NO,
            user:{
                connect:{
                    id:user.id
                }
        }
    }})
    return { user, student };
   } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Could not register user");
   }
    
}