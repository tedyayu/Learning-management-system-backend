import prisma from "../../utils/prismaInstance";


export const EditAnnouncement = async (id: string, updatedData: { title?: string; message?: string }) => {
    try {
        return await prisma.adminAnnouncement.update({
            where: { id: id },
            data: {
                title: updatedData.title,
                content: updatedData.message,
            },
        });
    } catch (error) {
        console.error("Error updating announcement:", error);
        throw new Error("Could not update announcement");
    }
}