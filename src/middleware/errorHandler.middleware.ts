import dotenv from 'dotenv';
import { Request, Response, NextFunction, type ErrorRequestHandler } from "express";
import ApiError from "../errors/apiError";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

dotenv.config();

const errorHandlerMiddleware: any = ( error:any , req:Request , res: Response, next: NextFunction) => {
    
    const defaultError = { status: 500, message: "Something went wrong" };

    if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
    }

    if ( error instanceof ApiError) { 
        defaultError.status = error.status;
        defaultError.message = error.message;
    }
    if ( error instanceof PrismaClientInitializationError){
       if(process.env.NODE_ENV === "development"){ 
           return res.status(500).json({ error: error.message });
       }else{
           return res.status(500).json({ error: "Something went wrong" });
       }
    }

    return res.status(defaultError.status).json({ error: defaultError.message });
}

export default errorHandlerMiddleware;