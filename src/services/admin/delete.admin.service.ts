import prisma from "../../utils/prismaInstance";

export const deleteAnnouncement = async (announcementId: string) => {
    try {
        const deletedAnnouncement = await prisma.adminAnnouncement.delete({
            where: {
                id: announcementId,
            },
        });
        return deletedAnnouncement;
    } catch (error) {
        console.error("Error deleting announcement:", error);
        throw new Error("Could not delete announcement");
    }
}   
