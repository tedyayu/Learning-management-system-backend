const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

export const getAdminByUserName=(username:string)=>{
    if(username===adminUsername){
        return {username:adminUsername,role:"ADMIN"};
    }
}