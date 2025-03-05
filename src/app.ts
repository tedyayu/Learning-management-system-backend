import express, {Express, Request, Response, type ErrorRequestHandler} from "express" 
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";
import studentRoutes from "./routes/studentRoutes";
import instractorRoutes from "./routes/instractorRoutes";
import prisma from "./utils/prismaInstance";

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

app.use("/api/auth",authRoutes);
app.use("/api/student",studentRoutes);
app.use("/api/instractor",instractorRoutes);




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

