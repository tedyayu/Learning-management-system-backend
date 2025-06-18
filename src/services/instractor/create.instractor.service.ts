import prisma from "../../utils/prismaInstance";
interface CreateInstructorData {
    username: string;
    password: string;
    instructorId: string;
    email: string;
}

export const createInstructor =async (data:CreateInstructorData)=>{
   try {
    const user= await prisma.user.create({
        data:{
            username:data.username,
            password:data.password,
            email:data.email,
            role:"INSTRUCTOR",
        }
    });
    const instructor= await prisma.instructor.create({
        data:{
            firstName:data.username,
            instructorId:data.instructorId,
            user:{
                connect:{
                    id:user.id
                }
        }
    }})

    return {user,instructor};
   } catch (error) {
        console.error("Error registering instructor:", error);
        throw new Error("Could not register instructor");
   }
}