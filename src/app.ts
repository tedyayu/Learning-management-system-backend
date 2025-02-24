import express, {Express, Request, Response, type ErrorRequestHandler} from "express" 
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";

dotenv.config();
const PORT:Number =Number(process.env.PORT) || 5000;


const app:Express=express()
app.use(
    cors({
        origin:"http://localhost:5174",
        credentials: true 
    })
);

app.use(express.json());

app.use("/api/auth",authRoutes);




app.use(errorHandlerMiddleware);

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})