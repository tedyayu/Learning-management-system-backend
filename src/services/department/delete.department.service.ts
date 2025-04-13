import prisma from "../../utils/prismaInstance";


export const deleteDepartmentById = async (id: string) => {
    try {
        const department = await prisma.department.delete({
            where: {
                id: id
            }
        });
        return department;
    } catch (error) {
        console.error("Error deleting department:", error);
        throw new Error("Could not delete department"); 
    }
}