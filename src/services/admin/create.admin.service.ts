import prisma from "../../utils/prismaInstance";


export const addAnnouncement = async (announcement: { title: string; message: string }) => {
    try {
        return await prisma.adminAnnouncement.create({
            data: {
                title: announcement.title,
                content: announcement.message,
            },
        });
    
    } catch (error) {
        console.error("Error adding announcement:", error);
        throw new Error("Could not add announcement");
    }
}