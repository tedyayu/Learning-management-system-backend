const {PrismaClient} =require('@prisma/client');
const prisma= new PrismaClient();

async function registerStudentModel(username,hashedPassword,ID_NO) {
    try {
        const student=await prisma.student.create({
            data:{
                fullName:username,
                password:hashedPassword,
                studentID:ID_NO,
            
            }
        })
        return student;
    } catch (error) {
        console.error("Error registering user:", error);
        throw new Error("Could not register user");
    }
    
}

async function getUserByUsernameModel(username) {
    return await prisma.student.findFirst({
        where:{
            fullName:username
        }
    })
}

module.exports={
    registerStudentModel,
    getUserByUsernameModel
}