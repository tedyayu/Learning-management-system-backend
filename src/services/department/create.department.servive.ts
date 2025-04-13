import prisma from "../../utils/prismaInstance";
interface departmentData{
    name: string;
    lead: string;
    description: string;
    email: string;
    location: string;
}
export const createNewDepartment =async (data:departmentData)=>{
    try {
        const department= await prisma.department.create({
           data:{
               name:data.name,
               lead:data.lead,
               description:data.description,
               email:data.email,
               location:data.location
           }
        });
        return department;
    } catch (error) {
        console.error("Error creating department:", error);
        throw new Error("Could not create department");
    }
}