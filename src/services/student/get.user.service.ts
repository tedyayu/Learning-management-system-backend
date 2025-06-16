import exp from "constants";
import prisma from "../../utils/prismaInstance";


export const getStudentByUserName=async(username:string) => {
    return await prisma.user.findFirst({
        where: {
            username: username
        },
        include:{
            student:{
                include:{CourseEnrollments:{
                    include:{
                        course:{
                            include:{
                                Chapter:{
                                    include:{
                                        lessons:true
                                    }
                                },
                                department:true,
                            }
                        }
                    }
                }}
            }
        }
        })
}

export const getStudentByEmail=async(email:string) => {
    return await prisma.user.findFirst({
        where: {
            email: email
        }
        })      
    }
export const getStudentById=async(id:string) => {
    return await prisma.user.findFirst({
        where: {
            id: id
        }
        })
}

export const getUserById=async(id:string) => {
    return await prisma.user.findFirst({        
        where: {
            id: id
        }
        })  
    }

export const fetchStudents=async()=>{
    return await prisma.user.findMany(
        {
            where:{
                role:"STUDENT"
            },
            include:{
                student:true
            }
        }
    )   
}

export const searchStudent=async(query:string)=>{
    return await prisma.user.findFirst({
        where:{
            OR:[
                {
                    username:{
                        contains:query
                    }
                },
                {
                    email:{
                        contains:query
                    }
                }
            ],
            role:"STUDENT"
        },
        include:{
            student:true
        }
    })
};
    
