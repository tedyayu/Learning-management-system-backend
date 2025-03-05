import prisma from "../../utils/prismaInstance";

export const updateStudentProfile = async (profilePhoto: string, firstName:string, lastName:string, email:string,language:string,phoneNumber:string,id:string) => {
    try {
        await prisma.student.update({
            where: {
                id: id
            },
            data: {
                profilePhotoURL: profilePhoto,
                firstName: firstName,
                lastName: lastName,
                //email: email,
                language: language,
                phone: phoneNumber
            }});
    } catch (error) {
        console.error("Error updating student profile:", error);
        throw new Error("Could not update student profile");
    }
};

export const updateStudentPassword = async (newPassword: string, id: string) => {
    try {
        await prisma.user.update({
            where: {
                id: id
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