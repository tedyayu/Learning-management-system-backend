import express, {Express, Request, Response, type ErrorRequestHandler} from "express" 
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";
import studentRoutes from "./routes/studentRoutes";
import instractorRoutes from "./routes/instractorRoutes";
import departmentRoutes from "./routes/departmentRoutes";
import courseRoutes from "./routes/courseRoutes";
import recommendationRoutes from "./routes/recommendationRoutes";
import prisma from "./utils/prismaInstance";

const cookieParser = require("cookie-parser");


dotenv.config();
const PORT:Number =Number(process.env.PORT) || 5000;


const app:Express=express()
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials: true 
    })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/student",studentRoutes);
app.use("/api/instractor",instractorRoutes);
app.use("/api/department",departmentRoutes);
app.use("/api/course",courseRoutes);
app.use('/recommend',recommendationRoutes);


app.use(errorHandlerMiddleware);

const startServer=async()=>{
    try {
        await prisma.$connect();
        console.log("Database connected")

        app.listen(PORT,()=>{
            console.log(`server is running at ${PORT}`)
        })

    } catch (error) {
        console.error("Error starting server:",error)
    }
};

startServer();