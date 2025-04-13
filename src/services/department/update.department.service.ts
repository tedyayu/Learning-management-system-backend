import prisma from "../../utils/prismaInstance";
interface departmentData{
    name: string;
    lead: string;
    description: string;
    email: string;
    location: string;
}

export const updateDepartmentById = async (id: string, data: departmentData) => {
    try {
        const department = await prisma.department.update({
            where: {
                id: id
            },
            data: {
                name: data.name,
                lead: data.lead,
                description: data.description,
                email: data.email,
                location: data.location
            }
        });
        return department;
    } catch (error) {
        console.error("Error updating department:", error);
        throw new Error("Could not update department");
    }
}

export const publishDepartmentById = async (id: string) => {
    try {
        const department = await prisma.department.update({
            where: {
                id: id
            },
            data: {
                published: true
            }
        });
        return department;
    } catch (error) {
        console.error("Error publishing department:", error);
        throw new Error("Could not publish department");
    }
}

export const unpublishDepartmentById = async (id: string) => {
    try {
        const department = await prisma.department.update({
            where: {
                id: id
            },
            data: {
                published: false
            }
        });
        return department;
    } catch (error) {
        console.error("Error publishing department:", error);
        throw new Error("Could not publish department");
    }
}