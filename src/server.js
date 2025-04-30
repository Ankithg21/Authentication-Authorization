import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

connectDB();

app.use("/api/v1", userRoutes);

app.get("/",(req,res)=>{
    res.json(
        {
            message:"Welcome to the server.",
            status:200,
        }
    );
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on Port:${process.env.PORT}.`);
});

