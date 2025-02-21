const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const model=require("../models/prismaClient")


const registerUserController=async (req,res)=>{
    const {username,password,ID_NO,role}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    try {
        switch (role) {
            case 'student':
                const student=await model.registerStudentModel(username,hashedPassword,ID_NO);
                res.json({message:"Student registered successfully!"});
                break;
            case 'instractor':
                const instractor=await model.registerInstractorModel(username,hashedPassword,ID_NO);
                res.json({message:"Instractor registered successfully!"});
                break;
            default:
                return res.status(400).json({ message: "Invalid role specified!" });
        }
        
    } catch (error) {
        console.error("registration error", error);
        res.status(400).json({error:"user already exists"});
    }
}


const loginUserController=async (req,res)=>{
    const {username, password}= req.body;
    try {
        const user=await model.getUserByUsernameModel(username)
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({error:"Invalid credentials"})
        }
        const token=jwt.sign({id:user.id, role:user.role}, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({token,user})
    } catch (error) {
        console.error("Login error", error);
        return res.status(500).json({ error: "An error occurred while logging in" });
    }
}

module.exports={registerUserController,loginUserController};