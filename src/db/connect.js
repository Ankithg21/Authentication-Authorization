import mongoose, { connections } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB= async()=>{
    if(connections[0].readyState){
        console.log("Database is already connected.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

export default connectDB;