import prisma from "../../utils/prismaInstance";
interface departmentData{
    name: string;
    lead: string;
    description: string;
    email: string;
    location: string;
}

export const getAllDepartments=async()=>{
    return await prisma.department.findMany(
        {include:
            {courses:{
                include:{Chapter:{
                    include:{lessons:true}
                },instructor:{include:{user:true}}}
    }}}); 
}

export const getDepartmentByname=async(name:string)=>{
    return await prisma.department.findFirst({
        where:{
            name:name
        }
    })
}
export const getDepartmentById=async(id:string)=>{
    return await prisma.department.findFirst({
        where:{
            id:id
        }
    })
}