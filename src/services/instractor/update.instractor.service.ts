import prisma from "../../utils/prismaInstance";

export const updateInstractorProfile = async (profilePhoto: string, firstName:string, lastName:string, email:string,language:string,phoneNumber:string,bio:string, expertise:string,linkedin:string, twitter:string, userId:string) => {
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                email: email,
                username: firstName
            }
        })
        await prisma.instructor.update({
            where: {
                userId: userId
            },
            data: {
                profilePhotoURL: profilePhoto,
                firstName: firstName,
                lastName: lastName,
                language: language,
                phone: phoneNumber,
                bio:bio,
                expertise:expertise,
                linkedin:linkedin,
                twitter:twitter
            }});
    } catch (error) {
        console.error("Error updating student profile:", error);
        throw new Error("Could not update student profile");
    }
};

export const updateInstractorPassword = async (newPassword: string, userId: string) => {
    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: newPassword
            }
        });
    } catch (error) {
        console.error("Error updating student password:", error);
        throw new Error("Could not update student password");
    }
};