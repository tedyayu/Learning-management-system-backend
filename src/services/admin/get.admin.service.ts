const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;
import prisma from "../../utils/prismaInstance";


export const getAdminByUserName=(username:string)=>{
    if(username===adminUsername){
        return {username:adminUsername,role:"ADMIN"};
    }
}

export const getAllAnnouncements=async()=>{
    try {
        return await prisma.adminAnnouncement.findMany();
    } catch (error) {
        console.error("Error fetching announcements:", error);
        throw new Error("Could not fetch announcements");
    }
}