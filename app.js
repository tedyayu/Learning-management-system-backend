require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoutes=require("./src/routes/authRoutes")

const app=express()
app.use(
    cors({
        origin:"http://localhost:5174", credentials: true 
    })
);

app.use(express.json());

app.use("/api/auth",authRoutes);


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})